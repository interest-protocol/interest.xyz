import useSWR from 'swr';

import { POOLS } from '@/constants/pools';

import { LPCoinsPriceProps } from './use-lp-coins-price.types';

export const useLPCoinsPrice = () =>
  useSWR<Record<string, LPCoinsPriceProps>>(
    [useLPCoinsPrice.name],
    async () => {
      const poolPrices = await Promise.all(
        POOLS.map(({ poolAddress }) =>
          fetch(
            `https://api.interestlabs.io/v1/movement/mainnet/curve/lp-price/${poolAddress}`
          )
            .then((response) => response.json())
            .then((data: LPCoinsPriceProps) =>
              !data.lpPrice
                ? []
                : ([poolAddress, data] as [string, LPCoinsPriceProps])
            )
            .catch(() => [])
        )
      );

      return poolPrices.reduce(
        (acc, [poolAddress, data]) =>
          data.lpPrice ? { ...acc, [poolAddress]: data } : acc,
        {}
      );
    }
  );
