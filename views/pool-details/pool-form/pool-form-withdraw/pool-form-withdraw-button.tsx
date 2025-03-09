import { Network } from '@interest-protocol/interest-aptos-v2';
import { Button, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { useModal } from '@/hooks/use-modal';

import { PoolFormButtonProps } from '../pool-form.types';

const PoolFormWithdrawButton: FC<PoolFormButtonProps> = ({ form }) => {
  const dex = useInterestDex();
  const { dialog, handleClose } = useDialog();
  const { getValues, control, setValue } = form;
  const { handleClose: closeModal } = useModal();
  const { account, signAndSubmitTransaction } = useAptosWallet();

  const error = useWatch({ control, name: 'error' });

  const handleWithdraw = async () => {
    try {
      invariant(account, 'You must be connected to proceed');

      setValue('error', '');

      const lpCoin = getValues('lpCoin');

      const payload = dex.removeLiquidity({
        lpFa: lpCoin.type,
        recipient: account.address,
        amount: BigInt(lpCoin.valueBN.decimalPlaces(0, 1).toString()),
      });

      const tx = await signAndSubmitTransaction({ payload });

      invariant(tx.status === 'Approved', 'Rejected by User');

      const txResult = tx.args;

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.MovementMainnet](`txn/${txResult.hash}`)
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

  const onWithdraw = () => {
    closeModal();
    dialog.promise(handleWithdraw(), {
      loading: () => ({
        title: 'Withdrawing...',
        message:
          'We are Withdrawing, and you will let you know when it is done',
      }),
      success: () => ({
        title: 'Withdraw Successfully',
        message:
          'Your withdraw was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      }),
      error: (error) => ({
        title: 'Withdraw Failure',
        message:
          (error as Error).message ||
          'Your withdrawing failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
    });
  };

  return (
    <Button
      py="s"
      my="l"
      mt="xl"
      mx="auto"
      variant="filled"
      disabled={!!error}
      onClick={onWithdraw}
      width="fill-available"
    >
      <Typography variant="label" size="large" textAlign="center" width="100%">
        Confirm Withdraw
      </Typography>
    </Button>
  );
};

export default PoolFormWithdrawButton;
