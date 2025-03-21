import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

const MaxButton: FC = () => {
  const { coinsMap } = useCoins();
  const { setValue, control } = useFormContext<IPoolForm>();

  const token = useWatch({ control, name: 'lpCoin' });

  const balance = coinsMap[token.type]?.balance ?? ZERO_BIG_NUMBER;

  const handleMax = () => {
    setValue(`lpCoin.valueBN`, balance);
    setValue(`lpCoin.value`, String(FixedPointMath.toNumber(balance)));
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
