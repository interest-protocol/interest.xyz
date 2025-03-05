import { useEffect, useState } from 'react';

import { COINS_EXPOSED } from '@/constants/coins';
import { formatDollars, parseToMetadata } from '@/utils';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';

const useExposedCoins = () => {
  const [exposedCoins, setExposedCoins] = useState<any[]>([]);

  useEffect(() => {
    Promise.all(
      COINS_EXPOSED.map((coin) => {
        const coinParsed = parseToMetadata(
          coin as unknown as CoinMetadata | FAMetadata
        );

        return fetch(
          `https://rates-api-staging.up.railway.app/api/fetch-quote?coins=${coinParsed.type}`,
          {
            method: 'GET',
            headers: {
              network: 'MOVEMENT',
            },
          }
        )
          .then((response) => response.json())
          .then((data) => ({
            ...coin,
            usd: formatDollars(data[0].price),
            usdPrice24Change: data[0]?.priceChange24HoursPercentage,
          }))
          .catch(() => ({
            ...coin,
            usd: '-',
            usdPrice24Change: '-',
          }));
      })
    ).then((coinsWithPrices) => {
      setExposedCoins(coinsWithPrices);
    });
  }, []);

  return { exposedCoins };
};

export default useExposedCoins;
