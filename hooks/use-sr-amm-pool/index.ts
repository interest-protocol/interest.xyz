import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import { toPairs, values } from 'ramda';
import useSWR from 'swr';

import { SrAmmPoolWithMetadata } from '@/interface';
import { getCoinsMetadataFromAPI, parseToMetadata } from '@/utils';

import { useInterestV2Dex } from '../use-interest-dex-v2';
import useSrAmmPoolConfig from '../use-sr-pool-config';

type MetadataKeys = 'metadata' | 'metadataY' | 'metadataX';

const useSrAmmPool = (address: string, withMetadata = true) => {
  const dexV2 = useInterestV2Dex();

  const { config } = useSrAmmPoolConfig();

  const {
    data: pool,
    isLoading: loading,
    ...rest
  } = useSWR([useSrAmmPool.name, address, withMetadata], async () => {
    const srPool = await dexV2.getPool(address);

    const newPool = srPool as unknown as SrAmmPoolWithMetadata;

    if (!withMetadata) return newPool;

    const metadataAddresses: Record<MetadataKeys, string> = {
      metadata: normalizeSuiAddress(srPool.poolAddress.toString()),
      metadataX: normalizeSuiAddress(srPool.metadataX.toString()),
      metadataY: normalizeSuiAddress(srPool.metadataY.toString()),
    };

    const assetsMetadata = await getCoinsMetadataFromAPI(
      values(metadataAddresses)
    );

    for (const [key, address] of toPairs(metadataAddresses))
      newPool[key] = parseToMetadata(
        assetsMetadata.find(({ type }) => type === address)!
      );

    return newPool;
  });

  return { loading, config, pool, ...rest };
};

export default useSrAmmPool;
