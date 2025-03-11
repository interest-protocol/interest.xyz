import useSWR from 'swr';

import { TokenPrice } from '@/interface';

export const useCoinsPrice = (coins: ReadonlyArray<string>) =>
  useSWR<ReadonlyArray<TokenPrice>>(['prices', ...coins], () =>
    fetch(
      `https://rates-api-staging.up.railway.app/api/fetch-quote?${coins.map((coin) => `coins=${coin}`)}`,
      { headers: { network: 'MOVEMENT' } }
    ).then((response) => response.json())
  );
