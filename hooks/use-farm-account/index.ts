import { useAptosWallet } from '@razorlabs/wallet-kit';
import useSWR from 'swr';

import { FARMS_BY_LP } from '@/constants';

import { useInterestCurveDex } from '../use-interest-dex-curve';

export const useFarmAccount = (lpAddress: string) => {
  const interestCurveDex = useInterestCurveDex();
  const { account: currentAccount } = useAptosWallet();

  return useSWR(
    [useFarmAccount.name, interestCurveDex, currentAccount, lpAddress],
    async () => {
      const farm = FARMS_BY_LP[lpAddress];

      if (!currentAccount || !farm) return;

      const { address, rewards } = farm;

      return interestCurveDex.getFarmAccount({
        rewardFas: rewards,
        farm: address.toString(),
        user: currentAccount.address,
      });
    }
  );
};
