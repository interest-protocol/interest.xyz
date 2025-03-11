import { AccountAddress } from '@aptos-labs/ts-sdk';
import useSWR from 'swr';
import { useState } from 'react';

import { TOKENS } from '@/constants/coins';
import { TokenPrice, TokenWithPrice } from '@/interface';
import { formatDollars } from '@/utils';

const useExposedCoins = () => {
  const [exposedCoins, setExposedCoins] = useState<
    ReadonlyArray<TokenWithPrice>
  >([]);

  const { data, ...rest } = useSWR(
    'coins-to-expose',
    async () => {
      try {
        const prices: ReadonlyArray<TokenPrice> = await fetch(
          `https://rates-api-staging.up.railway.app/api/fetch-quote?${TOKENS.map(
            (coin) => `coins=${coin.address.toString()}`
          ).join('&')}`,
          {
            method: 'GET',
            headers: { network: 'MOVEMENT' },
          }
        ).then((res) => {
          if (!res.ok) throw new Error('Failed to fetch prices');
          return res.json();
        });

        const coinsToExpose = TOKENS.reduce((acc, coin) => {
          const item = prices.find((item) =>
            coin.address.equals(AccountAddress.from(item.coin))
          );

          if (!item) return acc;

          return [
            ...acc,
            {
              ...coin,
              usd: formatDollars(item.price),
              usdPrice24Change: item.priceChange24HoursPercentage,
            },
          ];
        }, [] as ReadonlyArray<TokenWithPrice>);

        setExposedCoins(coinsToExpose);
        return coinsToExpose;
      } catch (error) {
        console.error('Error fetching exposed coins:', error);
        return null;
      }
    },
    {
      refreshInterval: 120000,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshWhenHidden: false,
    }
  );

  return {
    data,
    ...rest,
  };
};

export default useExposedCoins;
