import { AccountAddress } from '@aptos-labs/ts-sdk';
import useSWR from 'swr';

import { TOKENS } from '@/constants/coins';
import { useExposedCoinsContext } from '@/context/exposedCoins';
import { TokenPrice, TokenWithPrice } from '@/interface';
import { formatDollars } from '@/utils';

const useExposedCoins = () => {
  const { exposedCoins, setExposedCoins } = useExposedCoinsContext();

  const { data, ...rest } = useSWR(
    'coins-to-expose',
    async () => {
      try {
        const prices: Array<TokenPrice> = await fetch(
          `https://rates-api-staging.up.railway.app/api/fetch-quote?${TOKENS.map(
            (coin) => `coins=${coin.address.toString()}`
          ).join('&')}`,
          {
            method: 'GET',
            headers: { network: 'MOVEMENT' },
          }
        ).then((res) => res.json());

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
        }, [] as TokenWithPrice[]);

        setExposedCoins(coinsToExpose);

        return coinsToExpose;
      } catch (error) {
        console.error('Error fetching exposed coins:', error);
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 30000,
    }
  );

  return { exposedCoins: data || exposedCoins, ...rest };
};

export default useExposedCoins;
