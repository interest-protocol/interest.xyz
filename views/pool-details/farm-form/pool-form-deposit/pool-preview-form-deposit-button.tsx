import { Button, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import PoolPreview from '../pool-form-preview';
import PoolFormDepositButton from './pool-form-deposit-button';

const PoolPreviewFormDepositButton: FC = () => {
  const { setModal } = useModal();
  const { pool } = usePoolDetails();
  const form = useFormContext<IPoolForm>();

  const { getValues, control } = form;
  const error = useWatch({ control, name: 'error' });

  const lpTokenValue = useWatch({ control, name: 'lpCoin.value' });
  const firsTokenValue = useWatch({ control, name: 'tokenList.0.value' });
  const secondTokenValue = useWatch({ control, name: 'tokenList.1.value' });

  const addDeposit = async () => {
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
              <PoolFormDepositButton
                form={form}
                algorithm={pool!.algorithm}
                poolAddress={pool!.poolAddress}
              />
            }
            isDeposit
          />
        </Motion>,
        {
          isOpen: true,
          custom: true,
          opaque: false,
          allowClose: true,
        }
      );
  };

  const disabled =
    !!error || pool?.algorithm === 'v2'
      ? !firsTokenValue || !secondTokenValue
      : !lpTokenValue;

  return (
    <Button
      py="s"
      mt="xl"
      mx="auto"
      variant="filled"
      width="max-content"
      onClick={addDeposit}
      disabled={disabled}
    >
      Deposit
    </Button>
  );
};

export default PoolPreviewFormDepositButton;
