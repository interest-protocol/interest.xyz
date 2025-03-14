import BigNumber from 'bignumber.js';
import { empty } from 'ramda';

import { TokenPrice } from '@/interface';
import { FixedPointMath } from '@/lib';
import { getCoinsMetadataFromAPI } from '@/utils';

export const getBasedCoins = async (data: ReadonlyArray<TokenPrice>) => {
  const usdCoins = data.filter(({ base }) => !base);
  const basedCoins = data.filter(({ base }) => base);

  if (!basedCoins.length) return usdCoins;

  const bases = data.map(({ base }) => base);
  const uniqueBases = Array.from(new Set(bases));

  const basedCoinsMetadata = await getCoinsMetadataFromAPI(
    basedCoins.map((coin) => coin.coin)
  );

  const basesPricesMap = await fetch(
    `https://api.staging.interestlabs.io/v1/rates?${uniqueBases.map((coin) => `coins=${String(coin)}`).join('&')}`,
    { headers: { network: 'MOVEMENT', cache: 'force-cache' } }
  )
    .then((response) => response.json())
    .then((data: ReadonlyArray<TokenPrice>) =>
      data.reduce(
        (acc, price) => ({ ...acc, [price.coin]: price.price }),
        {} as Record<string, number>
      )
    );

  if (empty(basesPricesMap)) return usdCoins;

  return [
    ...usdCoins,
    ...basedCoins.map((coin, index) => ({
      ...coin,
      price:
        basesPricesMap[coin.base!] /
        FixedPointMath.toNumber(
          BigNumber(coin.price),
          basedCoinsMetadata[index].decimals
        ),
    })),
  ];
};
