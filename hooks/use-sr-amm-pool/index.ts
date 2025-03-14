import { AccountAddress } from '@aptos-labs/ts-sdk';
import useSWR from 'swr';

import { SrAmmPoolWithMetadata } from '@/interface';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { getCoinMetadata, parseToMetadata } from '@/utils';

import { useInterestDex } from '../use-interest-dex';

type MetadataKeys = 'metadata' | 'metadataY' | 'metadataX';

const useSrAmmPool = (address: string) => {
  const dex = useInterestDex();
  const client = useAptosClient();

  const { data: config } = useSWR([useSrAmmPool.name, dex.getConfig.name], () =>
    dex.getConfig()
  );

  const {
    data: pool,
    isLoading: loading,
    ...rest
  } = useSWR([useSrAmmPool.name], async () => {
    const srPool = await dex.getPool(address);

    const newPool = srPool as unknown as SrAmmPoolWithMetadata;

    const list: ReadonlyArray<[MetadataKeys, AccountAddress]> = [
      ['metadata', srPool.poolAddress],
      ['metadataX', srPool.metadataX],
      ['metadataY', srPool.metadataY],
    ];

    for (const [key, address] of list) {
      const data = await getCoinMetadata(address.toString(), client);

      newPool[key] = parseToMetadata(data);
    }

    return newPool;
  });

  return { loading, pool, config, ...rest };
};

export default useSrAmmPool;
