import { AccountAddress } from '@aptos-labs/ts-sdk';
import { useEffect, useState } from 'react';

import { TOKENS } from '@/constants/coins';
import { TokenPrice, TokenWithPrice } from '@/interface';
import { formatDollars } from '@/utils';

const useExposedCoins = () => {
  const [exposedCoins, setExposedCoins] = useState<
    ReadonlyArray<TokenWithPrice>
  >([]);

  useEffect(() => {
    fetch(
      `https://rates-api-staging.up.railway.app/api/fetch-quote?${TOKENS.map((coin) => `coins=${coin.address.toString()}`).join('&')}`,
      {
        method: 'GET',
        headers: { network: 'MOVEMENT' },
      }
    )
      .then((res) => res.json())
      .then((data: ReadonlyArray<TokenPrice>) => {
        const coinsToExpose = TOKENS.reduce((acc, coin) => {
          const item = data.find((item) =>
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
      });
  }, []);

  return { exposedCoins };
};

export default useExposedCoins;
