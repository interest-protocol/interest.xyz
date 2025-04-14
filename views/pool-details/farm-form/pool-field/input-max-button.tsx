import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { NameProps } from './pool-field.types';

const MaxButton: FC<NameProps> = ({ name }) => {
  const { coinsMap } = useCoins();
  const { setValue, control } = useFormContext<IPoolForm>();

  const token = useWatch({ control, name });

  const balance = coinsMap[token.type]?.balance ?? ZERO_BIG_NUMBER;

  const handleMax = () => {
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

    setValue(`${name}.valueBN`, value);
    setValue(
      `${name}.value`,
      FixedPointMath.toNumber(
        value.decimalPlaces(0, 1),
        token.decimals
      ).toString()
    );
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
