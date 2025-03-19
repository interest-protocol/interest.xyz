import { Network } from '@interest-protocol/interest-aptos-v2';
import useSWR from 'swr';

import { ISrPool } from '@/interface';

export const usePools = (page: number = 1, findQuery = {}) =>
  useSWR(
    `https://api.interestlabs.io/v1/movement/pools-v2?page=${page}&q=${JSON.stringify(findQuery)}&network=${Network.MovementMainnet}&limit=30`,
    async () => {
      const {
        limit,
        totalItems,
        data: pools,
      } = await fetch(
        `https://api.interestlabs.io/v1/movement/pools-v2?page=${page}&q=${JSON.stringify(findQuery)}&network=${Network.MovementMainnet}&limit=30`
      ).then((res) => res.json?.());

      const uniquePools = pools?.reduce((acc: ISrPool[], pool: ISrPool) => {
        if (!acc.find((p) => p.poolAddress === pool.poolAddress)) {
          acc.push(pool);
        }
        return acc;
      }, []);

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
