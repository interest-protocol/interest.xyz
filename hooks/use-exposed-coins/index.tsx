import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { TOKENS } from '@/constants/coins';
import { TokenPrice } from '@/interface';
import { AssetWithPrice } from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata } from '@/utils';

import { useCoinsPrice } from '../use-coins-price';

const useExposedCoins = () => {
  const [prices, setPrices] = useState<ReadonlyArray<TokenPrice>>([]);
  const { data } = useCoinsPrice(
    TOKENS.flatMap((token) =>
      token.type && token.address
        ? [token.address.toString(), token.type]
        : (token.type ?? token.address.toString())
    )
  );

  useEffect(() => {
    if (data?.length) setPrices(data);
  }, [data]);

  const { data: exposedCoins, ...rest } = useSWR<ReadonlyArray<AssetWithPrice>>(
    ['coins-to-expose', prices.length],
    async () => {
      if (!prices || !prices.length) return [];

      return TOKENS.reduce((acc, coin) => {
        const item = prices.find(
          (item) => (coin.type ?? coin.address.toString()) === item.coin
        );

        if (!item) return acc;

        return [
          ...acc,
          {
            ...parseToMetadata(coin),
            usdPrice: item.price,
            usdPrice24Change: item.priceChange24HoursPercentage,
          },
        ];
      }, [] as ReadonlyArray<AssetWithPrice>);
    },
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnReconnect: false,
    }
  );

  return { exposedCoins, ...rest };
};

export default useExposedCoins;
