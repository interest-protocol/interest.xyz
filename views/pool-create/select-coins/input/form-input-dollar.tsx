import { Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useCoinsPrice } from '@/hooks/use-coins-price';
import { formatDollars } from '@/utils';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const FormInputDollar: FC<InputProps> = ({ index }) => {
  const { control } = useFormContext<CreatePoolForm>();

  const [type, value] = useWatch({
    control,
    name: [`tokens.${index}.type`, `tokens.${index}.value`],
  });

  const { data: prices } = useCoinsPrice(type);

  const usdValue =
    prices?.length && value
      ? formatDollars(
          +BigNumber(value)
            .times(BigNumber(prices[0].price))
            .toNumber()
            .toFixed(3)
        )
      : '--';

  return (
    <Typography
      size="small"
      variant="label"
      textAlign="right"
      color="onSurface"
    >
      {usdValue} USD
    </Typography>
  );
};

export default FormInputDollar;
