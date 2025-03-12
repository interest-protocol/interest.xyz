import { Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { MOVE } from '@/constants/coins';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import { formatDollars } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const QuoteInputDollar: FC = () => {
  const { data: price } = useCoinsPrice(MOVE.type);
  const { control } = useFormContext<ICreateTokenForm>();

  const value = useWatch({ control, name: 'pool.quoteValue' });

  const usdValue =
    price && value
      ? formatDollars(
          +BigNumber(value).times(price[0].price).toNumber().toFixed(3)
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

export default QuoteInputDollar;
