import { FARMS } from '@interest-protocol/interest-aptos-curve';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import useSWR from 'swr';

import { FARMS_BY_LP } from '@/constants';

import { useInterestCurveDex } from '../use-interest-dex-curve';

export const useGetAccountFarmsData = () => {
  const interestCurveDex = useInterestCurveDex();
  const { account: currentAccount } = useAptosWallet();

  return useSWR([useGetAccountFarmsData.name, currentAccount], async () => {
    const { rewards } = Object.values(FARMS_BY_LP).reduce<{
      rewards: `0x${string}`[];
    }>(
      (acc, item) => {
        acc.rewards.push(...item.rewards);
        return acc;
      },
      { rewards: [] }
    );

    if (!currentAccount) return;

    return interestCurveDex.getAccountFarmsData({
      rewardFas: rewards,
      farms: FARMS.map((farm) => farm.address.toString()),
      user: currentAccount.address,
    });
  });
};
