import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const Balance: FC<InputProps> = ({ index }) => {
  const { coinsMap, loading } = useCoins();
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const type = useWatch({ control, name: `tokens.${index}.type` });
  const decimals = useWatch({ control, name: `tokens.${index}.decimals` });

  if (!type)
    return (
      <Box
        p="2xs"
        gap="0.5rem"
        display="flex"
        color="onSurface"
        alignItems="center"
      >
        <Typography size="small" variant="body" fontSize="xs">
          Balance: 0
        </Typography>
      </Box>
    );

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
      p="2xs"
      gap="0.5rem"
      display="flex"
      color="onSurface"
      variant="outline"
      alignItems="center"
      onClick={handleMax}
      borderColor="transparent"
      nHover={{ bg: 'unset', borderColor: 'primary' }}
      className="loading-balance"
    >
      <Typography size="small" variant="body" fontSize="xs">
        Balance:{' '}
        {!loading
          ? type
            ? `${FixedPointMath.toNumber(balance, decimals)}`
            : '--'
          : ''}
      </Typography>
      {loading && <ProgressIndicator variant="loading" size={12} />}
    </Button>
  );
};

export default Balance;
