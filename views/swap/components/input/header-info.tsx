import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const form = useFormContext();

  const symbol = useWatch({ control: form.control, name: `${label}.symbol` });
  const toValue = useWatch({ control: form.control, name: 'to.value' });

  const isValueEmpty = !toValue || isNaN(+toValue) || +toValue <= 0;

  const labelText =
    label === 'from' ? 'Sell' : label === 'to' && isValueEmpty ? 'Buy' : 'Sell';

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      color="onSurface"
      alignItems="flex-end"
    >
      <Typography
        size="large"
        variant="label"
        color="#9CA3AF"
        fontFamily="Inter"
        fontSize="0.868125rem"
      >
        {labelText}
        <Typography
          as="span"
          size="small"
          fontSize="s"
          variant="body"
          display={['inline-block', 'none']}
        >
          : {symbol}
        </Typography>
      </Typography>
    </Box>
  );
};

export default HeaderInfo;
