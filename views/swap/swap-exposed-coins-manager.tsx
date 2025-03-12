import { AccountAddress } from '@aptos-labs/ts-sdk';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { TOKENS } from '@/constants/coins';
import { TokenPrice, TokenWithPrice } from '@/interface';

const SwapExposedCoinsManager = () => {
  const form = useFormContext();

  const getPrices = () => {
    fetch(
      `https://rates-api-staging.up.railway.app/api/fetch-quote?${TOKENS.map(
        (coin) => `coins=${coin.address.toString()}`
      ).join('&')}`,
      {
        method: 'GET',
        headers: {
          network: 'MOVEMENT',
        },
      }
    )
      .then((response) => response.json())
      .then((data: TokenPrice[]) => {
        const coinsToExpose = TOKENS.reduce<TokenWithPrice[]>((acc, coin) => {
          const item = data.find((item) =>
            coin.address.equals(AccountAddress.from(item.coin))
          );

          if (!item) return acc;

          return [
            ...acc,
            {
              ...coin,
              usd: String(item.price),
              usdPrice24Change: item.priceChange24HoursPercentage,
            },
          ];
        }, []);

        form.setValue('exposedCoins', coinsToExpose);
      })
      .catch(() => null);
  };

  useEffect(() => {
    if (!form.getValues('exposedCoins')?.length) getPrices();
  }, []);

  return null;
};

export default SwapExposedCoinsManager;
