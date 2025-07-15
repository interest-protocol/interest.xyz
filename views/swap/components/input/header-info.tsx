import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const form = useFormContext();

  const symbol = useWatch({ control: form.control, name: `${label}.symbol` });

  const labelText = label === 'from' ? 'Sell' : 'Buy';

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
        fontSize="0.875rem"
        fontWeight="400"
        lineHeight="1.25rem"
      >
        {labelText}
        <Typography
          as="span"
          size="small"
          variant="body"
          fontFamily="Inter"
          fontSize="0.875rem"
          fontWeight="400"
          lineHeight="1.25rem"
          display={['inline-block', 'none']}
        >
          : {symbol}
        </Typography>
      </Typography>
    </Box>
  );
};

export default HeaderInfo;
