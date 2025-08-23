import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@interest-protocol/interest-aptos-v2';
import { Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestCurveDex } from '@/hooks/use-interest-dex-curve';
import { useInterestV2Dex } from '@/hooks/use-interest-dex-v2';
import { useModal } from '@/hooks/use-modal';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';

import { PoolFormButtonProps } from '../pool-form.types';

const PoolFormWithdrawButton: FC<PoolFormButtonProps> = ({
  form,
  algorithm,
  poolAddress,
}) => {
  const client = useAptosClient();
  const dexV2 = useInterestV2Dex();
  const dexCurve = useInterestCurveDex();
  const { dialog, handleClose } = useDialog();
  const { getValues, control, setValue } = form;
  const { handleClose: closeModal } = useModal();
  const { account, signAndSubmitTransaction } = useWallet();

  const error = useWatch({ control, name: 'error' });

  const handleWithdraw = async () => {
    try {
      invariant(account, 'You must be connected to proceed');

      setValue('error', '');

      const lpCoin = getValues('lpCoin');

      let data, txResult;
      const selectedCoinIndex = getValues('selectedCoinIndex');
      if (algorithm === 'curve') {
        if (selectedCoinIndex[0] && selectedCoinIndex[1]) {
          data = dexCurve.removeLiquidity({
            pool: poolAddress,
            recipient: account.address,
            amount: BigInt(lpCoin.valueBN.toFixed(0)),
            minAmountsOut: getValues('tokenList').map(() => BigInt(0)),
          });
        } else {
          const tmpIndex = selectedCoinIndex
            ? selectedCoinIndex[0]
              ? 0
              : 1
            : 0;
          data = dexCurve.removeLiquidityOneFa({
            pool: lpCoin.type,
            minAmountOut: BigInt(0),
            recipient: account.address,
            amount: BigInt(lpCoin.valueBN.decimalPlaces(0, 1).toString()),
            faOut: getValues('tokenList')[tmpIndex!].type,
          });
        }
      }

      if (algorithm === 'v2') {
        data = dexV2.removeLiquidity({
          lpFa: lpCoin.type,
          recipient: account.address,
          amount: BigInt(lpCoin.valueBN.decimalPlaces(0, 1).toString()),
        });
      }

      if (data) {
        const tx = await signAndSubmitTransaction({ data });

        invariant(tx.status === 'Approved', 'Rejected by User');

        txResult = tx.args;
      }

      if (txResult) {
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
          EXPLORER_URL[Network.MovementMainnet](`txn/${txResult.hash}`)
        );
      }
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
          'Your withdrawal is being processed. This may take a few moments.',
      }),
      success: () => ({
        title: 'Withdraw Successful',
        message: 'Your funds have been successfully withdrawn.',
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
