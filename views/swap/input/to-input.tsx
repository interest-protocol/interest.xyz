import { Box, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Balance from './balance';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import SelectToken from './select-token';

const ToInput: FC = () => {
  const { control } = useFormContext();

  const value = useWatch({ control, name: 'to.value' });

  return (
    <Box>
      <HeaderInfo label="to" />
      <Box
        py="l"
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" justifyContent="space-between" gap="xs">
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <TextField
              disabled
              value={value}
              ml="-1rem"
              width="100%"
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              fontFamily="Proto"
              fontSize={['2xl', '4xl']}
              fieldProps={{
                width: '100%',
                border: 'none',
                nHover: {
                  border: 'none',
                },
              }}
            />
          </Box>
          <SelectToken label="to" />
        </Box>
        <Box display="flex" justifyContent="space-between" color="outline">
          <AmountInDollar label="to" />
          <Balance label="to" />
        </Box>
      </Box>
    </Box>
  );
};

export default ToInput;
