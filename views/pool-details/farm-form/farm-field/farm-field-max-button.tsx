import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import { Button } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useFarmAccount } from '@/hooks/use-farm-account';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { FarmFieldProps } from './farm-field.types';

const MaxButton: FC<FarmFieldProps> = ({ farmMode }) => {
  const { coinsMap } = useCoins();
  const { setValue, control } = useFormContext<IPoolForm>();

  const token = useWatch({ control, name: 'lpCoin' });

  const farmAccount = useFarmAccount(token.type);

  const balance =
    (farmMode
      ? farmAccount.data?.amount && BigNumber(String(farmAccount.data.amount))
      : !!token.type && coinsMap[normalizeSuiAddress(token.type)]?.balance) ||
    ZERO_BIG_NUMBER;

  const handleMax = () => {
    const value = balance.minus(
      FixedPointMath.toBigNumber(isAptos(token.type) ? 1 : 0, token.decimals)
    );

    if (isAptos(token.type) && !value.isPositive()) {
      setValue(`lpCoin.value`, '0');
      setValue(`lpCoin.valueBN`, ZERO_BIG_NUMBER);
      return;
    }

    setValue(`lpCoin.valueBN`, value);
    setValue(
      `lpCoin.value`,
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
