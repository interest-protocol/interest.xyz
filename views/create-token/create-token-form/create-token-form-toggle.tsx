import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ICreateTokenForm } from '../create-token.types';

const FixedSupplyToggle: FC = () => {
  const { control, setValue } = useFormContext<ICreateTokenForm>();
  const [supply, value] = useWatch({
    control,
    name: ['supply', 'fixedSupply'],
  });

  return (
    <Box
      p="m"
      my="xl"
      gap="m"
      bg="surface"
      display="flex"
      borderRadius="xs"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between" color="onSurface">
        <Typography variant="body" size="large">
          Fixed Supply
        </Typography>
        <ToggleButton
          name="Fixed Supply"
          defaultValue={!!value}
          disabled={!Number(supply)}
          onClick={() =>
            !!Number(supply) && setValue('fixedSupply', not(value))
          }
        />
      </Box>
      <Typography variant="body" size="small" color="onSurface" opacity={0.6}>
        The Treasury Cap will be sent to {value ? 'the @0x0 address' : 'you'}
      </Typography>
    </Box>
  );
};

export default FixedSupplyToggle;
