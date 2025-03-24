import { Network } from '@interest-protocol/interest-aptos-v2';
import useSWR from 'swr';

import { IPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

interface IAPIV2Pool {
  supply: bigint;
  balanceY: bigint;
  balanceX: bigint;
  metadataY: string;
  metadataX: string;
  isSrMode: boolean;
  poolAddress: string;
  bidLiquidity: bigint;
  slotBalanceX: bigint;
  slotBalanceY: bigint;
  lastSlotTimestamp: bigint;
  metadata: {
    x: AssetMetadata;
    y: AssetMetadata;
    pool: AssetMetadata;
  };
}

export const usePools = (page: number = 1, findQuery = {}) =>
  useSWR(
    [usePools.name, page, findQuery],
    async () => {
      const {
        limit,
        totalItems,
        data: pools,
      } = await fetch(
        `https://api.interestlabs.io/v1/movement/pools-v2?page=${page}&q=${JSON.stringify(findQuery)}&network=${Network.MovementMainnet}&limit=30`
      ).then((res) => res.json?.());

      const uniquePools = pools?.map(
        ({
          poolAddress,
          metadata,
          metadataX,
          metadataY,
          ...pool
        }: IAPIV2Pool) =>
          ({
            algorithm: 'v2',
            poolAddress: poolAddress,
            poolMetadata: metadata.pool,
            tokensAddresses: [metadataX, metadataY],
            tokensMetadata: [metadata.x, metadata.y],
            poolExtraData: pool,
          }) as IPool
      );

      return {
        done: true,
        pools: uniquePools ?? [],
        totalPages: Math.ceil(totalItems / limit),
      };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
