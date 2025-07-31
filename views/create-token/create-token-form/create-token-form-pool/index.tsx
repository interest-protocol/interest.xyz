import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ICreateTokenForm } from '../../create-token.types';
import CreateTokenFormPoolForm from './create-token-form-pool-form';

export const CreateTokenFormPoolToggle: FC = () => {
  const { control, setValue } = useFormContext<ICreateTokenForm>();
  const value = useWatch({ control, name: 'pool.active' });
  return (
    <ToggleButton
      name="Fixed Supply"
      defaultValue={value}
      onClick={() => setValue('pool.active', not(value))}
    />
  );
};

const CreateTokenFormPool: FC = () => (
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
        Deploy Pool Instantly
      </Typography>
      <CreateTokenFormPoolToggle />
    </Box>
    <Typography variant="body" size="small" color="onSurface" opacity={0.6}>
      This feature will deploy the pool automatically
    </Typography>
    <CreateTokenFormPoolForm />
  </Box>
);

export default CreateTokenFormPool;
