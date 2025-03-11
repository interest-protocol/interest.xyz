import { AccountAddress } from '@aptos-labs/ts-sdk';
import useSWR from 'swr';

import { TOKENS } from '@/constants/coins';
import { AssetWithPrice } from '@/lib/coins-manager/coins-manager.types';
import { formatDollars, parseToMetadata } from '@/utils';

import { useCoinsPrice } from '../use-coins-price';

const useExposedCoins = () => {
  const { data: prices } = useCoinsPrice(
    TOKENS.flatMap((token) =>
      token.type && token.address
        ? [token.address.toString(), token.type]
        : (token.type ?? token.address.toString())
    )
  );

  const { data: exposedCoins, ...rest } = useSWR<ReadonlyArray<AssetWithPrice>>(
    ['coins-to-expose', prices],
    async () => {
      console.log({ prices });

      if (!prices) return [];

      return TOKENS.reduce((acc, coin) => {
        const item = prices.find((item) =>
          coin.address.equals(AccountAddress.from(item.coin))
        );

        if (!item) return acc;

        return [
          ...acc,
          {
            ...parseToMetadata(coin),
            usdPrice: formatDollars(item.price),
            usdPrice24Change: item.priceChange24HoursPercentage,
          },
        ];
      }, [] as ReadonlyArray<AssetWithPrice>);
    }
  );

  return { exposedCoins, ...rest };
};

export default useExposedCoins;
