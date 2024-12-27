import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { COINS_EXPOSED } from '@/constants/coin-fa';
import { FixedPointMath } from '@/lib';
import { formatDollars } from '@/utils';

const useExposedCoins = () => {
  const [exposedCoins, setExposedCoins] = useState<any[]>([]);

  useEffect(() => {
    Promise.all(
      COINS_EXPOSED.map((coin) =>
        fetch(
          `/api/v1/usd-price?type=${coin.address.toString()}&decimals=${coin.decimals}`
        )
          .then((res) => res.json?.() ?? res.text?.())
          .then((value) =>
            formatDollars(
              FixedPointMath.toNumber(BigNumber(value), coin.decimals)
            )
          )
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
