import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IPoolForm } from '@/views/pools/pools.types';

const SyncButton: FC = () => {
  const { setValue, control } = useFormContext<IPoolForm>();

  const poolType = useWatch({ control, name: 'pool.algorithm' });
  const syncBalance = useWatch({ control, name: 'syncBalances' });

  if (poolType == 'v2') return;

  return (
    <Box
      display="flex"
      alignItems="center"
      cursor="pointer"
      onClick={() => setValue('syncBalances', not(syncBalance))}
    >
      <Typography variant="label" size="large">
        Balanced
      </Typography>
      <ToggleButton
        name="syncButton"
        defaultValue={!!syncBalance}
        onClick={() => setValue('syncBalances', not(syncBalance))}
      />
    </Box>
  );
};

export default SyncButton;
