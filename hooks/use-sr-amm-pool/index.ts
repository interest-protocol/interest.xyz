import { toPairs, values } from 'ramda';
import useSWR from 'swr';

import { SrAmmPoolWithMetadata } from '@/interface';
import { getCoinsMetadataFromAPI, parseToMetadata } from '@/utils';

import { useInterestDex } from '../use-interest-dex';
import useSrAmmPoolConfig from '../use-sr-pool-config';

type MetadataKeys = 'metadata' | 'metadataY' | 'metadataX';

const useSrAmmPool = (address: string, withMetadata = true) => {
  const dex = useInterestDex();

  const { config } = useSrAmmPoolConfig();

  const {
    data: pool,
    isLoading: loading,
    ...rest
  } = useSWR([useSrAmmPool.name, address, withMetadata], async () => {
    const srPool = await dex.getPool(address);

    const newPool = srPool as unknown as SrAmmPoolWithMetadata;

    if (!withMetadata) return newPool;

    const metadataAddresses: Record<MetadataKeys, string> = {
      metadata: srPool.poolAddress.toString(),
      metadataX: srPool.metadataX.toString(),
      metadataY: srPool.metadataY.toString(),
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
