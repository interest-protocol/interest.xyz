import { useEffect, useState } from 'react';

import { COINS_EXPOSED } from '@/constants/coin-fa';
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
          `https://api.mosaic.ag/v1/prices?ids[]=${coinParsed.type}`,
          {
            method: 'GET',
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json',
              'x-api-key': 'tYPtSqDun-w9Yrric2baUAckKtzZh9U0',
            },
          }
        )
          .then((response) => response.json())
          .then(({ data }) =>
            formatDollars(data.priceById[coinParsed.type].price)
          )
          .catch(() => '-');
      })
    ).then((prices) => {
      setExposedCoins(
        COINS_EXPOSED.map((coin, index) => ({ ...coin, usd: prices[index] }))
      );
    });
  }, []);

  return { exposedCoins };
};

export default useExposedCoins;
