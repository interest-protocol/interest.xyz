import { Button, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { FarmState } from '../farm-form.types';
import PoolPreview from '../farm-form-preview';
import FarmFormButton from './farm-form-button';

const FarmPreviewFormButton: FC<FarmState> = ({ state }) => {
  const { setModal } = useModal();
  const { pool } = usePoolDetails();
  const form = useFormContext<IPoolForm>();
  const { getValues, control } = form;

  const error = useWatch({ control, name: 'error' });

  const lpCoinValue = useWatch({
    control,
    name: 'lpCoin.value',
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
          isStake={!state}
          getValues={getValues}
          onSubmit={
            <FarmFormButton
              form={form}
              state={state}
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

  const disabled = !!error || lpCoinValue === '0' || !lpCoinValue;

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
      {state ? 'Unstake' : 'Stake'}
    </Button>
  );
};

export default FarmPreviewFormButton;
