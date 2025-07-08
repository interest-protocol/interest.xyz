import { FC, useEffect } from 'react';

import { useGetAccountFarmsData } from '@/hooks/use-get-account-farms-data';

import HeaderInfoLine from './header-info-line';

const UserPositionLine: FC = () => {
  const { data: farmList, isLoading } = useGetAccountFarmsData();

  useEffect(() => {
    if (!farmList) return;

    const stakedFarm = farmList
      .filter((farm) => farm.rewards.toString() != '0')
      .map((farm) => ({
        amount: farm.amount,
        address: farm.farm.toString(),
      }));
    console.log(stakedFarm);
  }, [isLoading, farmList]);

  return (
    <HeaderInfoLine title="User Position" isLoading={isLoading} value={'0'} />
  );
};

export default UserPositionLine;
