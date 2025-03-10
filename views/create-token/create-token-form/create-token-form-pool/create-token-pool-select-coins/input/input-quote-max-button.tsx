import { FA_ADDRESSES } from '@interest-protocol/interest-aptos-v2';
import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';
import { LIST_BUTTON_PERCENTAGE } from '@/views/create-token/create-token.data';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const InputQuoteMaxButton: FC = () => {
  const { coinsMap } = useCoins();
  const { setValue } = useFormContext<ICreateTokenForm>();

  const type = FA_ADDRESSES[Network.MovementMainnet].MOVE.toString();

  const balance = coinsMap[type]?.balance ?? ZERO_BIG_NUMBER;

  const handleMax = (percentage: number) => {
    const value = percentage
      ? balance.minus(FixedPointMath.toBigNumber(1))
      : balance.plus(FixedPointMath.toBigNumber(percentage));

    if (!value.isPositive()) {
      setValue('pool.quoteValue', '0');
      setValue('pool.quoteValueBN', ZERO_BIG_NUMBER);
      return;
    }

    setValue('pool.quoteValueBN', value);
    setValue('pool.quoteValue', String(FixedPointMath.toNumber(value)));
  };

  return (
    <Box display="flex" gap="xs">
      {LIST_BUTTON_PERCENTAGE.map((item) => (
        <Button
          px="xs"
          py="2xs"
          key={v4()}
          fontSize="xs"
          variant="outline"
          color="onSurface"
          borderRadius="2xs"
          disabled={balance.isZero()}
          onClick={() => handleMax(item.percentage)}
        >
          {item.display}
        </Button>
      ))}
    </Box>
  );
};

export default InputQuoteMaxButton;
