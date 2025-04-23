import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import FarmFormRewards from './farm-form-rewards';

const FarmRewards: FC = () => (
  <Box display="flex" flexDirection="column" gap="m">
    <Typography variant="body" size="large">
      Rewards
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

export default FarmRewards;
