import { VolatilePool } from '@interest-protocol/interest-aptos-curve';
import { Button } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { MaxButtonProps } from './pool-field.types';

const MaxButton: FC<MaxButtonProps> = ({ name, index }) => {
  const { coinsMap } = useCoins();
  const { loading, pool } = usePoolDetails();
  const { setValue, getValues, control } = useFormContext<IPoolForm>();

  const token = useWatch({ control, name });

  const balance = coinsMap[token.type]?.balance ?? ZERO_BIG_NUMBER;

  const handleMax = () => {
    if (loading || !pool) return;

    setValue(`lpCoin.locked`, false);
    setValue(`tokenList.0.locked`, false);
    setValue(`tokenList.1.locked`, false);
    setValue(`${name}.locked`, true);

    const value = balance.minus(
      FixedPointMath.toBigNumber(isAptos(token.type) ? 1 : 0, token.decimals)
    );

    if (isAptos(token.type) && !value.isPositive()) {
      setValue(`${name}.value`, '0');
      setValue(`${name}.valueBN`, ZERO_BIG_NUMBER);
      return;
    }

    if (getValues('syncBalances')) {
      const amount = FixedPointMath.toNumber(
        value.decimalPlaces(0, 1),
        token.decimals
      ).toString();

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
        const ratio = getValues('ratio');
        const tvl = getValues('tvl') || 0;

        setValue(
          `tokenList.${newIndex}.value`,
          `${parseFloat((+amount * (+tvl >= 100 ? ratio[index] : 1)).toFixed(6))}`
        );
        setValue(
          `tokenList.${newIndex}.valueBN`,
          FixedPointMath.toBigNumber(
            +amount * (+tvl >= 100 ? ratio[index] : 1),
            getValues(`tokenList.${newIndex}.decimals`)
          )
        );
      } else {
        const poolExtraData = pool.poolExtraData as unknown as VolatilePool;
        const priceRaw =
          poolExtraData?.prices[pool.tokensAddresses[1]]?.lastPrice;
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
      setValue(
        `${name}.value`,
        FixedPointMath.toNumber(
          value.decimalPlaces(0, 1),
          token.decimals
        ).toString()
      );
      setValue(`${name}.valueBN`, value);
    }
  };

  return (
    <Button
      px="xs"
      py="2xs"
      fontSize="xs"
      variant="outline"
      borderRadius="2xs"
      color="onSurface"
      onClick={handleMax}
    >
      MAX
    </Button>
  );
};

export default MaxButton;
