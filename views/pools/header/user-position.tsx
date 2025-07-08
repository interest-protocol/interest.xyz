import BigNumber from 'bignumber.js';
import { FC } from 'react';

import { LPS_BY_FARMS } from '@/constants';
import { POOLS } from '@/constants/pools';
import { useGetAccountFarmsData } from '@/hooks/use-get-account-farms-data';
import { useLPCoinsPrice } from '@/hooks/use-lp-coins-price';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars } from '@/utils';

import HeaderInfoLine from './header-info-line';

const UserPositionLine: FC = () => {
  const { coinsMap } = useCoins();
  const { data: lpsPriceMap } = useLPCoinsPrice();
  const { data: farmList, isLoading } = useGetAccountFarmsData();

  const stakedAmounts: ReadonlyArray<[string, BigNumber]> =
    farmList?.flatMap((farm) =>
      Number(farm.rewards)
        ? [
            [
              LPS_BY_FARMS[farm.farm.toString()],
              BigNumber(farm.amount.toString()),
            ],
          ]
        : []
    ) ?? [];

  const lpCoinsBalance: ReadonlyArray<[string, BigNumber]> = POOLS.flatMap(
    ({ poolAddress }) =>
      coinsMap[poolAddress]
        ? [[poolAddress, coinsMap[poolAddress].balance]]
        : []
  );

  const usdUserPosition = lpsPriceMap
    ? [...stakedAmounts, ...lpCoinsBalance].reduce(
        (acc, [lpToken, balance]) =>
          acc +
          FixedPointMath.toNumber(balance, coinsMap[lpToken].decimals) *
            lpsPriceMap[lpToken].lpPrice,
        0
      )
    : 0;

  return (
    <HeaderInfoLine
      title="User Position"
      isLoading={isLoading}
      value={formatDollars(usdUserPosition)}
    />
  );
};

export default UserPositionLine;
