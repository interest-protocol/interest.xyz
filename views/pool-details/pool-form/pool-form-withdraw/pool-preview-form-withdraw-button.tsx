import { Button, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import PoolPreview from '../pool-form-preview';
import PoolFormWithdrawButton from './pool-form-withdraw-button';

const PoolPreviewFormWithdrawButton: FC = () => {
  const { setModal } = useModal();
  const { pool } = usePoolDetails();
  const form = useFormContext<IPoolForm>();
  const { getValues, control } = form;

  const error = useWatch({ control, name: 'error' });

  const [fieldValue, secondValue] = useWatch({
    control,
    name: ['tokenList.0.value', 'tokenList.1.value'],
  });

  const removeLiquidity = () =>
    !error &&
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <PoolPreview
          getValues={getValues}
          onSubmit={
            <PoolFormWithdrawButton
              form={form}
              algorithm={pool!.algorithm}
              poolAddress={pool!.poolAddress}
            />
          }
        />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  const disabled =
    !!error ||
    [fieldValue, secondValue].every((value) => value === '0' || !value);

  return (
    <Button
      py="s"
      mt="xl"
      mx="auto"
      variant="filled"
      width="max-content"
      disabled={disabled}
      onClick={removeLiquidity}
    >
      Withdraw
    </Button>
  );
};

export default PoolPreviewFormWithdrawButton;
