import { Box, Button } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { WithdrawSVG } from '@/components/svg';
import { EXPLORER_URL, FARMS_BY_LP, Network } from '@/constants';
import { useDialog } from '@/hooks';
import { useGetAccountFarmsData } from '@/hooks/use-get-account-farms-data';
import { useInterestCurveDex } from '@/hooks/use-interest-dex-curve';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';

import { IPoolForm } from '../pools.types';
import HeaderInfoLine from './header-info-line';

const RewardLine: FC = () => {
  const client = useAptosClient();
  const dexCurve = useInterestCurveDex();
  const { dialog, handleClose } = useDialog();
  const { handleClose: closeModal } = useModal();
  const { account, signAndSubmitTransaction } = useAptosWallet();

  const { getValues, setValue } = useFormContext<IPoolForm>();

  const farm = useGetAccountFarmsData();

  const disabled = !farm || farm.isLoading;

  const handleFarm = async () => {
    try {
      invariant(account, 'You must be connected to proceed');
      invariant(farm.data, 'Fail to get farms');

      setValue('error', '');
      const farmList = farm.data
        .filter((item) => item.rewards.toString() !== '0')
        .map((item) => item.farm);

      const rewards = Object.values(FARMS_BY_LP)
        .filter((farm) => farmList.includes(farm.address.toString()))
        .map((farm) => farm.rewards.toString());

      const payload = dexCurve.harvestAll({
        farms: farmList,
        rewardFas: rewards,
        recipient: account.address,
      });

      const tx = await signAndSubmitTransaction({ payload });

      invariant(tx.status === 'Approved', 'Rejected by User');

      const txResult = tx.args;

      let waitingTx = true;

      do {
        await client
          .waitForTransaction({
            transactionHash: txResult.hash,
            options: { checkSuccess: true },
          })
          .then(() => {
            waitingTx = false;
          })
          .catch();
      } while (waitingTx);

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.MAINNET](`txn/${txResult.hash}`)
      );
    } catch (e) {
      console.warn({ e });

      if ((e as any)?.data?.error_code === 'mempool_is_full')
        throw new Error('The mempool is full, try again in a few seconds.');

      throw e;
    }
  };

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    setValue('explorerLink', '');
  };

  const onHarvest = () => {
    if (disabled) return;

    closeModal();
    dialog.promise(handleFarm(), {
      loading: () => ({
        title: 'Withdrawing All Rewards',
        message:
          'We are Withdrawing your rewards, and you will let you know when it is done',
      }),
      success: () => ({
        title: `Withdrawing Successful`,
        message: `Your Rewards Withdraw was successfully, and you can check it on the Explorer`,
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      }),
      error: (error) => ({
        title: `Withdraw Failure`,
        message:
          (error as Error).message ||
          `Your Withdraw failed, please try again or contact the support team`,
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
    });
  };

  return (
    <HeaderInfoLine
      title="Rewards"
      isLoading={disabled}
      Button={
        <Button
          variant="filled"
          onClick={onHarvest}
          px={['xs', 'xs', 'm']}
          py={['xs', 'xs', 's']}
          disabled={disabled || !account}
        >
          <Box width="1rem" height="1rem">
            <WithdrawSVG maxWidth="100%" maxHeight="100%" width="100%" />
          </Box>
          Claim all
        </Button>
      }
      value={
        farm.data
          ? `${FixedPointMath.toNumber(
              farm.data.reduce(
                (acc, reward) =>
                  BigNumber(String(acc)).plus(
                    BigNumber(String(reward.rewards))
                  ),
                ZERO_BIG_NUMBER
              ),
              8
            ).toFixed(4)} MOVE`
          : '0.00 MOVE'
      }
    />
  );
};

export default RewardLine;
