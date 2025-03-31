import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import { Button, Motion } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import PoolPreview from '../pool-form-preview';
import PoolFormWithdrawButton from './pool-form-withdraw-button';

const PoolPreviewFormWithdrawButton: FC = () => {
  const { coinsMap } = useCoins();
  const { setModal } = useModal();
  const { pool } = usePoolDetails();
  const form = useFormContext<IPoolForm>();
  const { getValues, setValue, control } = form;

  const error = useWatch({ control, name: 'error' });

  const lpToken = useWatch({ control, name: 'lpCoin' });

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

  useEffect(() => {
    const lpBalance =
      (!!lpToken?.type &&
        coinsMap[normalizeSuiAddress(lpToken.type)]?.balance) ||
      ZERO_BIG_NUMBER;

    if (lpToken.valueBN?.isGreaterThan(lpBalance)) {
      !error && setValue('error', 'INSUFFICIENT BALANCE');
    } else setValue('error', null);
  }, [lpToken]);

  const disabled = !!error || !+lpToken.value;

  return (
    <Button
      py="s"
      mt="xl"
      mx="auto"
      variant="filled"
      width="max-content"
      nDisabled={{
        bg: error ? '#f6465d' : 'highestContainer',
        color: '#fff',
        ':hover': {
          background: error ? '#f6465d' : '#343438',
          color: '#fff',
        },
      }}
      onClick={removeLiquidity}
      disabled={disabled}
    >
      {error || 'Withdraw'}
    </Button>
  );
};

export default PoolPreviewFormWithdrawButton;
