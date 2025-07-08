import useSWR from 'swr';

import { LPCoinPriceProps } from './use-lp-coin-price.types';

export const useLPCoinPrice = (poolAddress?: string) => {
  const { data, error, isLoading } = useSWR<LPCoinPriceProps>(
    poolAddress ? [useLPCoinPrice.name, poolAddress] : null,
    () =>
      fetch(
        `https://api.interestlabs.io/v1/movement/mainnet/curve/lp-price/${poolAddress}`
      )
        .then((response) => response.json())
        .catch()
  );
  const loading = !poolAddress || isLoading;

  return {
    data,
    error,
    loading,
  };
};
