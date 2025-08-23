import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { FARMS } from '@interest-protocol/interest-aptos-curve';
import useSWR from 'swr';

import { MOVE } from '@/constants/coins';

import { useInterestCurveDex } from '../use-interest-dex-curve';

export const useGetAccountFarmsData = () => {
  const interestCurveDex = useInterestCurveDex();

  const { account: currentAccount } = useWallet();

  return useSWR([useGetAccountFarmsData.name, currentAccount], async () => {
    if (!currentAccount) return;

    return interestCurveDex.getAccountFarmsData({
      user: currentAccount.address,
      rewardFas: FARMS.map(() => MOVE.address.toString()),
      farms: FARMS.map((farm) => farm.address.toString()),
    });
  });
};
