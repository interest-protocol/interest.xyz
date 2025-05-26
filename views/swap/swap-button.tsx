import {
  Network,
  normalizeSuiAddress,
} from '@interest-protocol/interest-aptos-v2';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import ConnectWalletButton from '@/components/wallet/connect-wallet';
import { EXPLORER_URL } from '@/constants';
import { useDialog } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';

import SuccessModal from '../components/success-modal';
import SuccessModalTokenCard from '../components/success-modal/success-modal-token-card';
import { logSwap } from './swap.utils';

const SwapButton = () => {
  const client = useAptosClient();
  const network = useNetwork<Network>();
  const { coinsMap, mutate } = useCoins();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const { account, signAndSubmitTransaction } = useAptosWallet();
  const { getValues, setValue, control, reset } = useFormContext();

  const to = useWatch({ control, name: 'to' });
  const from = useWatch({ control, name: 'from' });
  const error = useWatch({ control, name: 'error' });
  const valueOut = useWatch({ control, name: 'to.value' });
  const valueIn = useWatch({ control, name: 'from.value' });

  const coin = coinsMap[normalizeSuiAddress(from?.type)];

  const balance = FixedPointMath.toNumber(
    coin?.balance ?? ZERO_BIG_NUMBER,
    coin?.decimals ?? coin?.decimals
  );

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');
  };

  const onCloseModal = () => {
    reset();
    handleClose();
  };

  const handleSwap = async () => {
    try {
      setLoading(true);
      setValue('error', '');

      if (!account) return;

      const { from, to, payload } = getValues();

      const startTime = Date.now();

      const tx = await signAndSubmitTransaction({ payload });

      invariant(tx.status === 'Approved', 'Rejected by User');

      const txResult = tx.args;

      const endTime = Date.now() - startTime;

      setValue('executionTime', String(endTime));

      await client.waitForTransaction({
        transactionHash: txResult.hash,
        options: {
          checkSuccess: true,
        },
      });

      logSwap(account!.address, from, to, network, txResult.hash);

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.MovementMainnet](`txn/${txResult.hash}`)
      );
    } catch (e) {
      console.warn(e);

      if ((e as any)?.data?.error_code === 'mempool_is_full')
        throw new Error('The mempool is full, try again in a few seconds.');

      throw e;
    } finally {
      mutate();
      setLoading(false);
    }
  };

  const onSwap = () =>
    dialog.promise(handleSwap(), {
      loading: () => ({
        title: 'Swapping...',
        message: 'We are swapping, and you will let you know when it is done',
      }),
      error: (error) => ({
        title: 'Swap Failure',
        message:
          (error as Error).message ||
          'Your swap failed, please try to increment your slippage and try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
      success: () => ({
        title: 'Swap Successful',
        message: (
          <SuccessModal
            transactionTime={`${(
              Number(getValues('executionTime')) / 1000
            ).toFixed(2)}`}
          >
            <SuccessModalTokenCard from={from} to={to} />
          </SuccessModal>
        ),
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
        secondaryButton: (
          <Button
            mr="s"
            color="onSurface"
            variant="outline"
            onClick={onCloseModal}
          >
            got it
          </Button>
        ),
      }),
    });

  const disabled =
    !Number(valueIn) ||
    !Number(valueOut) ||
    !Number(balance) ||
    valueIn < 0 ||
    valueOut < 0 ||
    !balance ||
    !!error;

  return (
    <Box display="flex" flexDirection="column" mt="xs">
      {account?.address ? (
        <Button
          height="2rem"
          variant="filled"
          borderRadius="s"
          onClick={onSwap}
          disabled={disabled}
          justifyContent="center"
          nDisabled={{
            bg: error ? '#f6465d' : 'highestContainer',
            ':hover': {
              background: error ? '#f6465d' : '#343438',
              color: '#909094',
            },
          }}
        >
          <Typography
            variant="label"
            size="large"
            color={error ? '#fff' : 'none'}
          >
            {loading ? 'Swapping...' : error ? error : 'Confirm Swap'}
          </Typography>
        </Button>
      ) : (
        <ConnectWalletButton />
      )}
    </Box>
  );
};

export default SwapButton;
