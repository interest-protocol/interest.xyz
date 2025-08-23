import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Button } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { isEmpty, values } from 'ramda';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { WithdrawSVG } from '@/components/svg';
import { EXPLORER_URL, FARMS_BY_LP, Network } from '@/constants';
import { useDialog } from '@/hooks';
import { useFarmAccount } from '@/hooks/use-farm-account';
import { useInterestCurveDex } from '@/hooks/use-interest-dex-curve';
import { useModal } from '@/hooks/use-modal';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { IPoolForm } from '@/views/pools/pools.types';

const FarmFormRewardButton: FC<{ rewardFa: string }> = ({ rewardFa }) => {
  const client = useAptosClient();
  const dexCurve = useInterestCurveDex();
  const { dialog, handleClose } = useDialog();
  const { handleClose: closeModal } = useModal();
  const { account, signAndSubmitTransaction } = useWallet();

  const { getValues, setValue } = useFormContext<IPoolForm>();
  const { data: farmAccount, isLoading: loadingBalances } = useFarmAccount(
    getValues('pool.poolAddress')
  );

  const balances = farmAccount?.rewards.reduce(
    (acc, curr) => ({ ...acc, [curr.fa]: BigNumber(String(curr.amount)) }),
    {} as Record<string, BigNumber>
  );

  const disabled =
    loadingBalances ||
    isEmpty(balances) ||
    values(balances ?? {}).every((balance) => balance.isZero());

  const handleFarm = async () => {
    try {
      invariant(account, 'You must be connected to proceed');

      setValue('error', '');

      const data = dexCurve.harvest({
        rewardFa,
        recipient: account.address,
        farm: FARMS_BY_LP[getValues('pool.poolAddress')].address.toString(),
      });

      const tx = await signAndSubmitTransaction({ data });

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
        title: 'Withdrawing Rewards',
        message:
          'We are Withdrawing your rewards, and you will let you know when it is done',
      }),
      success: () => ({
        title: `Withdrawal Successful`,
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
    <Button
      variant="filled"
      disabled={disabled}
      onClick={onHarvest}
      px={['xs', 'xs', 'm']}
      py={['xs', 'xs', 's']}
    >
      <Box width="1rem" height="1rem" display={['none', 'none', 'block']}>
        <WithdrawSVG maxWidth="100%" maxHeight="100%" width="100%" />
      </Box>
      Claim
    </Button>
  );
};

export default FarmFormRewardButton;
