import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const InputMaxButton: FC<InputProps> = ({ index }) => {
  const { coinsMap } = useCoins();
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const type = useWatch({ control, name: `tokens.${index}.type` });
  const decimals = useWatch({ control, name: `tokens.${index}.decimals` });

  const balance = coinsMap[type]?.balance ?? ZERO_BIG_NUMBER;

  const handleMax = () => {
    const value = balance.minus(
      FixedPointMath.toBigNumber(isAptos(type) ? 1 : 0)
    );

    if (isAptos(type) && !value.isPositive()) {
      setValue(`tokens.${index}.value`, '0');
      setValue(`tokens.${index}.valueBN`, ZERO_BIG_NUMBER);
      return;
    }

    setValue(
      `tokens.${index}.value`,
      String(FixedPointMath.toNumber(value, decimals))
    );
    setValue(`tokens.${index}.valueBN`, value);
  };

  return (
    <Button
      px="xs"
      py="2xs"
      fontSize="xs"
      color="onSurface"
      variant="outline"
      borderRadius="2xs"
      disabled={!type}
      onClick={handleMax}
    >
      MAX
    </Button>
  );
};

export default InputMaxButton;
