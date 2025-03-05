import { FA_ADDRESSES } from '@interest-protocol/interest-aptos-v2';
import { Network } from '@interest-protocol/interest-aptos-v2';
import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const InputQuoteMaxButton: FC = () => {
  const { coinsMap } = useCoins();
  const { setValue } = useFormContext<ICreateTokenForm>();

  const type = FA_ADDRESSES[Network.MovementMainnet].APT.toString();

  const balance = coinsMap[type]?.balance ?? ZERO_BIG_NUMBER;

  const handleMax = () => {
    const value = balance.minus(FixedPointMath.toBigNumber(1));

    if (!value.isPositive()) {
      setValue('pool.quoteValue', '0');
      setValue('pool.quoteValueBN', ZERO_BIG_NUMBER);
      return;
    }

    setValue('pool.quoteValueBN', value);
    setValue('pool.quoteValue', String(FixedPointMath.toNumber(value)));
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

export default InputQuoteMaxButton;
