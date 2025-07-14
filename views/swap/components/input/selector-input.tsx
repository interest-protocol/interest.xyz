import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { InputProps } from './input.types';
import SelectToken from './select-token';

const SelectorInput: FC<InputProps> = ({ label }) => {
  return (
    <Box
      py="s"
      px="xl"
      display="flex"
      bg="#9CA3AF1A"
      borderRadius="s"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        size="medium"
        color="#9CA3AF"
        fontWeight="400"
        variant="display"
        fontFamily="Inter"
        fontSize="0.96875rem"
        textTransform="capitalize"
      >
        {label}
      </Typography>
      <Box>
        <SelectToken label="from" />
      </Box>
    </Box>
  );
};

export default SelectorInput;
