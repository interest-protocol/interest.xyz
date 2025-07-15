import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Button } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestV2Dex } from '@/hooks/use-interest-dex-v2';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import SuccessModal from '@/views/components/success-modal';

import { ICreateTokenForm } from '../../create-token.types';
import { logCreateToken } from '../../create-token.utils';
import { CreateTokenFormButtonProps } from './create-token-form-button.types';

const CreateTokenFormButton: FC<CreateTokenFormButtonProps> = ({
  step,
  onClick,
  onBackClick,
}) => {
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
        Network.MovementMainnet,
        txResult.hash
      );

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.MovementMainnet](`txn/${txResult.hash}`)
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
        title: 'Creating Token...',
        message:
          'We are creating the token, and you will let you know when it is done',
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
        title: 'Token Created!',
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

  const requiredFieldsFilled = !!(
    values.name &&
    values.symbol &&
    values.projectUrl
  );

  const canProceedStepOne = step === 1 && requiredFieldsFilled;
  const canSubmitStepTwo =
    step === 2 && !!account && !loading && values.decimals && values.supply;

  return (
    <Box
      gap="1.5rem"
      display="flex"
      flexShrink={0}
      alignItems="center"
      justifyContent="space-between"
    >
      <Button
        py="1rem"
        width="47%"
        bg="#9CA3AF1A"
        fontSize="1rem"
        variant="filled"
        fontWeight="500"
        fontFamily="Inter"
        borderRadius="0.75rem"
        justifyContent="center"
        color="#9CA3AF"
        disabled={step === 1}
        onClick={onBackClick}
        nHover={step === 1 ? {} : { color: '#002A78' }}
      >
        Back
      </Button>

      <Button
        py="1rem"
        width="47%"
        bg="#B4C5FF"
        fontSize="1rem"
        variant="filled"
        fontWeight="500"
        fontFamily="Inter"
        borderRadius="0.75rem"
        justifyContent="center"
        disabled={step === 1 ? !canProceedStepOne : !canSubmitStepTwo}
        onClick={step === 1 ? onClick : onSubmit}
      >
        {step === 1 ? 'Next' : 'Create Token'}
      </Button>
    </Box>
  );
};

export default CreateTokenFormButton;
