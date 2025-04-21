import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useFarmAccount } from '@/hooks/use-farm-account';
import { IPoolForm } from '@/views/pools/pools.types';

import FarmFormRewards from './farm-form-rewards';

const FarmRewards: FC = () => {
  const { control } = useFormContext<IPoolForm>();
  const { type } = useWatch({ control, name: 'lpCoin' });
  const { data } = useFarmAccount(type);

  console.log({ data });

  return (
    <Box display="flex" flexDirection="column" gap="m">
      <Typography variant="body" size="large">
        2. Rewards
      </Typography>
      <Box
        display="flex"
        borderRadius="xs"
        overflow="hidden"
        bg="lowestContainer"
        flexDirection="column"
      >
        <FarmFormRewards />
      </Box>
    </Box>
  );
};

export default FarmRewards;
