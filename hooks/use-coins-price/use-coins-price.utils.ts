import { Aptos } from '@aptos-labs/ts-sdk';
import BigNumber from 'bignumber.js';

import { TokenPrice } from '@/interface';
import { FixedPointMath } from '@/lib';

export const getBasedCoins =
  (client: Aptos) => async (data: ReadonlyArray<TokenPrice>) => {
    const usdCoins = data.filter(({ base }) => !base);
    const basedCoins = data.filter(({ base }) => base);
    const bases = data.map(({ base }) => base);
    const uniqueBases = Array.from(new Set(bases));

    const basedCoinsMetadata = await Promise.all(
      basedCoins.map((coin) =>
        client.getFungibleAssetMetadataByAssetType({
          assetType: coin.coin,
        })
      )
    );

    const basesPricesMap = await fetch(
      `https://rates-api-staging.up.railway.app/api/fetch-quote?${uniqueBases.map((coin) => `coins=${coin}`).join('&')}`,
      { headers: { network: 'MOVEMENT', cache: 'force-cache' } }
    )
      .then((response) => response.json())
      .then((data: ReadonlyArray<TokenPrice>) =>
        data.reduce(
          (acc, price) => ({ ...acc, [price.coin]: price.price }),
          {} as Record<string, number>
        )
      );

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
