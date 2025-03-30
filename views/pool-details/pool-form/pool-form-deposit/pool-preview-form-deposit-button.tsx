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
import PoolFormDepositButton from './pool-form-deposit-button';

const PoolPreviewFormDepositButton: FC = () => {
  const { coinsMap } = useCoins();
  const { setModal } = useModal();
  const { pool } = usePoolDetails();
  const form = useFormContext<IPoolForm>();

  const { getValues, setValue, control } = form;
  const error = useWatch({ control, name: 'error' });

  const lpTokenValue = useWatch({ control, name: 'lpCoin.value' });
  const firsToken = useWatch({ control, name: 'tokenList.0' });
  const secondToken = useWatch({ control, name: 'tokenList.1' });

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

  useEffect(() => {
    if (!firsToken && !secondToken) return;

    const balance0 =
      (!!firsToken?.type &&
        coinsMap[normalizeSuiAddress(firsToken.type)]?.balance) ||
      ZERO_BIG_NUMBER;

    const balance1 =
      (!!secondToken?.type &&
        coinsMap[normalizeSuiAddress(secondToken.type)]?.balance) ||
      ZERO_BIG_NUMBER;

    if (
      firsToken.valueBN?.isGreaterThan(balance0) ||
      secondToken.valueBN?.isGreaterThan(balance1)
    ) {
      !error && setValue('error', 'INSUFFICIENT BALANCE');
    } else setValue('error', null);
  }, [firsToken, secondToken]);

  const disabled =
    Boolean(error) ||
    (pool?.algorithm === 'v2'
      ? !firsToken?.value || !secondToken?.value
      : !+lpTokenValue);

  return (
    <Button
      py="s"
      mt="xl"
      mx="auto"
      variant="filled"
      width="max-content"
      onClick={addDeposit}
      disabled={disabled}
      nDisabled={{
        bg: error ? '#f6465d' : 'highestContainer',
        color: '#fff',
        ':hover': {
          background: error ? '#f6465d' : '#343438',
          color: '#fff',
        },
      }}
    >
      {error || 'Deposit'}
    </Button>
  );
};

export default PoolPreviewFormDepositButton;
