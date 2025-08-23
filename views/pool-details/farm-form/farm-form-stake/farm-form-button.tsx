import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@interest-protocol/interest-aptos-v2';
import { Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL, FARMS_BY_LP } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestCurveDex } from '@/hooks/use-interest-dex-curve';
import { useModal } from '@/hooks/use-modal';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';

import { PoolFarmsOption } from '../../pool-details.types';
import { FarmFormButtonProps } from '../farm-form.types';

const FarmFormButton: FC<FarmFormButtonProps> = ({
  form,
  state,
  poolAddress,
}) => {
  const client = useAptosClient();
  const dexCurve = useInterestCurveDex();
  const { dialog, handleClose } = useDialog();
  const { getValues, control, setValue } = form;
  const { handleClose: closeModal } = useModal();
  const { account, signAndSubmitTransaction } = useWallet();

  const error = useWatch({ control, name: 'error' });

  const handleFarm = async () => {
    try {
      invariant(account, 'You must be connected to proceed');

      setValue('error', '');

      const lpCoin = getValues('lpCoin');

      let data, txResult;

      if (state === PoolFarmsOption.Stake) {
        data = dexCurve.stake({
          faIn: poolAddress,
          amount: BigInt(lpCoin.valueBN.toFixed(0)),
          farm: FARMS_BY_LP[poolAddress].address.toString(),
        });
      } else {
        data = dexCurve.unstake({
          recipient: account.address,
          amount: BigInt(lpCoin.valueBN.toFixed(0)),
          farm: FARMS_BY_LP[poolAddress].address.toString(),
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

  const onFarm = () => {
    closeModal();
    dialog.promise(handleFarm(), {
      loading: () => ({
        title: state ? 'Unstaking...' : 'Staking...',
        message: `Your LP tokens are being ${state ? 'unstaked' : 'staked'}. This may take a few moments.`,
      }),
      success: () => ({
        title: `${state ? 'Unstake' : 'Stake'} Successful`,
        message: `Your LP tokens have been successfully ${state ? 'unstaked' : 'staked'}. ${state ? '' : 'You’re now earning rewards!'}`,
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      }),
      error: (error) => ({
        title: `${state ? 'Unstake' : 'Stake'} Failure`,
        message:
          (error as Error).message ||
          `Your ${state ? 'Unstake' : 'Stake'} failed, please try again or contact the support team`,
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
      onClick={onFarm}
      width="fill-available"
    >
      <Typography variant="label" size="large" textAlign="center" width="100%">
        Confirm {state ? 'Unstake' : 'Stake'}
      </Typography>
    </Button>
  );
};

export default FarmFormButton;
