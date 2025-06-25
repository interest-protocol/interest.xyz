import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const form = useFormContext();

  const symbol = useWatch({ control: form.control, name: `${label}.symbol` });

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      color="onSurface"
      alignItems="flex-end"
    >
      <Typography variant="label" size="large" fontSize="s" fontFamily="Inter">
        {label == 'from' ? 'Sell' : 'Buy'}
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
