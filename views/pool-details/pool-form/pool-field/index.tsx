import { VolatilePool } from '@interest-protocol/interest-aptos-curve';
import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { TokenIcon } from '@/components';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { parseInputEventToNumberString } from '@/utils';
import { TokenField } from '@/views/pool-create/select-coins/input/token-field';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { PoolOption } from '../../pool-details.types';
import Balance from './balance';
import MaxButton from './input-max-button';
import { PoolFieldsProps } from './pool-field.types';
import PoolFieldManager from './pool-field-manager';

const PoolField: FC<PoolFieldsProps> = ({ index, poolOptionView }) => {
  const { loading, pool } = usePoolDetails();
  const network = useNetwork<Network>();
  const { register, setValue, getValues } = useFormContext<IPoolForm>();

  const isDeposit = poolOptionView === PoolOption.Deposit;

  const fieldName: `tokenList.${number}` | 'lpCoin' = isDeposit
    ? `tokenList.${index}`
    : 'lpCoin';

  const token = getValues(fieldName);

  const symbol = token?.symbol;

  const handleChange = (v: ChangeEvent<HTMLInputElement>) => {
    if (loading || !pool) return;
    const amount = parseInputEventToNumberString(v);

    setValue(`lpCoin.locked`, false);
    setValue(`tokenList.0.locked`, false);
    setValue(`tokenList.1.locked`, false);
    setValue(`${fieldName}.locked`, true);
    if (getValues('syncBalances')) {
      const newIndex = +(index != 1);

      setValue(`tokenList.${index}.value`, amount);
      setValue(
        `tokenList.${index}.valueBN`,
        FixedPointMath.toBigNumber(
          amount,
          getValues(`tokenList.${index}.decimals`)
        )
      );

      if (pool.curve == 'stable') {
        setValue(`tokenList.${newIndex}.value`, amount);
        setValue(
          `tokenList.${newIndex}.valueBN`,
          FixedPointMath.toBigNumber(
            amount,
            getValues(`tokenList.${newIndex}.decimals`)
          )
        );
      } else {
        const poolExtraData = pool.poolExtraData as unknown as VolatilePool;
        const priceRaw =
          poolExtraData.prices[pool.tokensAddresses[1]]?.lastPrice;
        const price = FixedPointMath.toNumber(BigNumber(String(priceRaw)), 18);

        const newAmount = String(
          (newIndex ? +amount / price : +amount * price).toFixed(4)
        );
        setValue(`tokenList.${newIndex}.value`, newAmount);
        setValue(
          `tokenList.${newIndex}.valueBN`,
          FixedPointMath.toBigNumber(
            newAmount,
            getValues(`tokenList.${newIndex}.decimals`)
          )
        );
      }
    } else {
      setValue(`${fieldName}.value`, amount);
      setValue(
        `${fieldName}.valueBN`,
        FixedPointMath.toBigNumber(amount, token?.decimals)
      );
    }
  };

  return (
    <>
      <PoolFieldManager name={fieldName} />
      <TokenField
        active
        placeholder="0"
        textAlign="right"
        Balance={<Balance name={fieldName} />}
        ButtonMax={<MaxButton name={fieldName} index={index} />}
        fieldProps={{ bg: 'lowestContainer', p: 'xs' }}
        TokenIcon={
          <Box display="flex" alignItems="center" gap="s">
            {!loading ? (
              <>
                <TokenIcon
                  withBg
                  network={network}
                  url={token.iconUri}
                  symbol={isDeposit ? symbol : token?.name}
                  rounded={token.standard === TokenStandard.COIN}
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
          onChange: handleChange,
        })}
      />
    </>
  );
};

export default PoolField;
