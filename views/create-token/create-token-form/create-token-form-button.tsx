import { Box, Button } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL, Network } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestV2Dex } from '@/hooks/use-interest-dex-v2';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import SuccessModal from '@/views/components/success-modal';

import { ICreateTokenForm } from '../create-token.types';
import { logCreateToken } from '../create-token.utils';

const CreateTokenFormButton = () => {
  const dexV2 = useInterestV2Dex();
  const client = useAptosClient();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const { account, signAndSubmitTransaction } = useAptosWallet();
  const { control, setValue, getValues, reset } =
    useFormContext<ICreateTokenForm>();

  const values = useWatch({ control });

  const onCloseModal = (resetForm?: boolean) => {
    if (resetForm) reset();
    handleClose();
  };

  const gotoExplorer = () =>
    window.open(values.explorerLink, '_blank', 'noopener,noreferrer');

  const ableToMerge = !!(
    account &&
    !loading &&
    String(values.decimals) &&
    values.supply
  );

  const handleCreateToken = async () => {
    try {
      invariant(ableToMerge, 'Button must be enabled');
      setValue('error', '');
      setLoading(true);

      const {
        name,
        symbol,
        supply,
        decimals,
        imageUrl: iconURI,
        projectUrl: projectURI,
      } = values;

      invariant(decimals && supply, 'You must fill the required fields');

      const createFaArgs = {
        name: name || '',
        symbol: symbol || '',
        iconURI,
        decimals,
        projectURI,
        recipient: account!.address,
        totalSupply: BigInt(
          FixedPointMath.toBigNumber(supply!, decimals).toString()
        ),
      };

      const payload = dexV2.createFa(createFaArgs);

      const startTime = Date.now();

      const tx = await signAndSubmitTransaction({ payload });

      invariant(tx.status === 'Approved', 'Rejected by User');

      const txResult = tx.args;

      const endTime = Date.now() - startTime;

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
          .catch(console.warn);
      } while (waitingTx);

      setValue('executionTime', String(endTime));

      logCreateToken(
        symbol || '',
        `${supply}`,
        account!.address,
        Network.MAINNET,
        txResult.hash
      );

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.MAINNET](`txn/${txResult.hash}`)
      );
    } catch (e) {
      console.warn({ e });

      if ((e as any)?.data?.error_code === 'mempool_is_full')
        throw new Error('The mempool is full, try again in a few seconds.');

      throw e;
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () =>
    dialog.promise(handleCreateToken(), {
      loading: () => ({
        title: 'Token Creation in Progress',
        message:
          'Your token is being created. This may take a few moments to complete.',
      }),
      error: (error) => ({
        title: 'Creation Failure',
        message:
          (error as Error).message ||
          'Your token creation failed, please try again or contact the support team',
        primaryButton: {
          label: 'Try again',
          onClick: () => onCloseModal(false),
        },
      }),
      success: () => ({
        title: 'Token Created Successfully',
        message: (
          <SuccessModal
            transactionTime={`${(
              Number(getValues('executionTime')) / 1000
            ).toFixed(2)}`}
          />
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
            onClick={() => onCloseModal(true)}
          >
            got it
          </Button>
        ),
      }),
    });

  return (
    <Box display="flex" alignItems="center">
      <Button
        py="m"
        flex="1"
        variant="filled"
        onClick={onSubmit}
        justifyContent="center"
        disabled={!ableToMerge}
      >
        Create coin
      </Button>
    </Box>
  );
};

export default CreateTokenFormButton;
