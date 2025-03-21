import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { TokenIcon } from '@/components';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { parseInputEventToNumberString } from '@/utils';
import { TokenField } from '@/views/pool-create/select-coins/input/token-field';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import Balance from './balance';
import MaxButton from './input-max-button';

const EarnField: FC = () => {
  const { loading } = usePoolDetails();
  const network = useNetwork<Network>();
  const { register, setValue, getValues } = useFormContext<IPoolForm>();

  const token = getValues('lpCoin');

  const symbol = token?.symbol;

  const handleChange = (v: ChangeEvent<HTMLInputElement>) => {
    const amount = parseInputEventToNumberString(v);

    setValue('lpCoin.value', amount);
    setValue(
      'lpCoin.valueBN',
      FixedPointMath.toBigNumber(amount, token?.decimals)
    );
  };

  return (
    <TokenField
      active
      placeholder="0"
      textAlign="right"
      Balance={<Balance />}
      ButtonMax={<MaxButton />}
      fieldProps={{ bg: 'lowestContainer', p: 'xs' }}
      TokenIcon={
        <Box display="flex" alignItems="center" gap="s">
          {!loading ? (
            <>
              <TokenIcon
                withBg
                network={network}
                url={token.iconUri}
                symbol={token?.name}
              />
              {symbol}
            </>
          ) : (
            <Box gap="s" display="flex" alignItems="center">
              <Skeleton
                width="calc(1.5rem * 1.66)"
                height="calc(1.5rem * 1.66)"
              />
              <Skeleton width="4.5rem" height="1.7rem" />
            </Box>
          )}
        </Box>
      }
      {...register('lpCoin.value', {
        onChange: handleChange,
      })}
    />
  );
};

export default EarnField;
