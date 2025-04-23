import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { TokenIcon } from '@/components';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { parseInputEventToNumberString } from '@/utils';
import { TokenField } from '@/views/pool-create/select-coins/input/token-field';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { FarmFieldProps } from './farm-field.types';
import Balance from './farm-field-balance';
import FarmFieldManager from './farm-field-manager';
import MaxButton from './farm-field-max-button';

const FarmField: FC<FarmFieldProps> = ({ farmMode }) => {
  const { loading } = usePoolDetails();
  const network = useNetwork<Network>();
  const { register, setValue, getValues } = useFormContext<IPoolForm>();

  const fieldName = 'lpCoin';

  const token = getValues(fieldName);

  const symbol = token?.symbol;

  return (
    <>
      <FarmFieldManager />
      <TokenField
        active
        placeholder="0"
        textAlign="right"
        Balance={<Balance farmMode={farmMode} />}
        ButtonMax={<MaxButton farmMode={farmMode} />}
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
        {...register(`${fieldName}.value`, {
          onChange: (v) => {
            const value = parseInputEventToNumberString(v);
            setValue?.(`${fieldName}.value`, value);
            setValue?.(
              `${fieldName}.valueBN`,
              FixedPointMath.toBigNumber(
                value,
                getValues(`${fieldName}.decimals`)
              )
            );
          },
        })}
      />
    </>
  );
};

export default FarmField;
