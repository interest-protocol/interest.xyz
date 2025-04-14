import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { DotErrorSVG } from '@/components/svg';
import { IPoolForm } from '@/views/pools/pools.types';

const DepositManager: FC = () => {
  const { control } = useFormContext<IPoolForm>();

  const error = useWatch({ control, name: 'error' });

  if (!error) return null;

  return (
    <Box
      p="s"
      mx="xl"
      gap="s"
      display="flex"
      borderRadius="xs"
      border="1px solid"
      bg="errorContainer"
      color="onErrorContainer"
      borderColor="onErrorContainer"
    >
      <DotErrorSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
      <Typography variant="label" size="medium">
        error
      </Typography>
    </Box>
  );
};

export default DepositManager;
