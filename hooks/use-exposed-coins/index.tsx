import { useEffect, useState } from 'react';

import { COINS_EXPOSED } from '@/constants/coin-fa';
import { PRICE_TYPE } from '@/constants/prices';
import { formatDollars } from '@/utils';

const useExposedCoins = () => {
  const [exposedCoins, setExposedCoins] = useState<any[]>([]);

  useEffect(() => {
    Promise.all(
      COINS_EXPOSED.map((coin) =>
        fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
          method: 'POST',
          body: JSON.stringify({ coins: [PRICE_TYPE[coin.symbol]] }),
          headers: { 'Content-Type': 'application/json', accept: '*/*' },
        })
          .then((response) => response.json())
          .then((data) => formatDollars(data[0].price))
          .catch(() => '-')
      )
    ).then((prices) => {
      setExposedCoins(
        COINS_EXPOSED.map((coin, index) => ({ ...coin, usd: prices[index] }))
      );
    });
  }, []);

  return { exposedCoins };
};

export default useExposedCoins;
