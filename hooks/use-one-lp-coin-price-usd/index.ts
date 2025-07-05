import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { FixedPointMath } from '@/lib';

import { useCoinsPrice } from '../use-coins-price';
import { useInterestCurveDex } from '../use-interest-dex-curve';
import { usePool } from '../use-pool';

export const useOneLpCoinPriceInUSD = (poolAddress: string) => {
  const interestCurveDex = useInterestCurveDex();
  const { pool, loading } = usePool(poolAddress);
  const { data: price } = useCoinsPrice(pool?.tokensAddresses);

  useSWR(
    price && !loading ? [poolAddress, price] : null,
    async () => {
      const ONE_LP = BigInt(1_000_000_000);

      const result = await interestCurveDex.quoteRemoveLiquidity({
        pool: poolAddress,
        amountIn: ONE_LP,
      });

      const { amountsOut } = result;

      if (!price || !pool) return 0;

      const oneLpCoinPriceInUsd = pool?.tokensMetadata!.reduce(
        (acc, token, i) =>
          acc.plus(
            BigNumber(amountsOut[i] ?? 0)
              .multipliedBy(price[i].price ?? 0)
              .dividedBy(BigNumber(10).pow(token?.decimals ?? 0))
          ),
        BigNumber(0)
      );

      return FixedPointMath.toNumber(
        oneLpCoinPriceInUsd,
        pool.poolMetadata!.decimals
      );
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};
