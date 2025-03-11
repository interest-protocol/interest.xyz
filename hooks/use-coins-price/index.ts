import useSWR from 'swr';

import { TokenPrice } from '@/interface';

export const useCoinsPrice = (coins: ReadonlyArray<string>) =>
  useSWR<ReadonlyArray<TokenPrice>>(['prices', ...coins], () =>
    fetch(
      `https://rates-api-staging.up.railway.app/api/fetch-quote?${coins.map((coin) => `coins=${coin}`).join('&')}`,
      { headers: { network: 'MOVEMENT', cache: 'force-cache' } }
    ).then((response) => response.json())
  );
