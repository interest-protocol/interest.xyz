import useSWR from 'swr';

import { TokenPrice } from '@/interface';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';

import { getBasedCoins } from './use-coins-price.utils';

export const useCoinsPrice = (coins?: string | ReadonlyArray<string>) => {
  const client = useAptosClient();

  return useSWR<ReadonlyArray<TokenPrice> | null>(['prices', coins], () =>
    !coins?.length
      ? null
      : fetch(
          `https://api.staging.interestlabs.io/v1/rates?${Array.isArray(coins) ? coins.map((coin) => `coins=${String(coin)}`).join('&') : `coins=${String(coins)}`}`,
          { headers: { network: 'MOVEMENT', cache: 'force-cache' } }
        )
          .then((response) => response.json())
          .then(getBasedCoins(client))
  );
};
