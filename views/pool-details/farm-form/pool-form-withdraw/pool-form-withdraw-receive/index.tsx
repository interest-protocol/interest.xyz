import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolFormWithdrawReceiveTokens from './pool-form-withdraw-receive-tokens';

const PoolFormWithdrawReceive: FC = () => {
  const pool = { poolType: 'amm' };

  return (
    <Box display="flex" flexDirection="column" gap="m">
      {pool?.poolType !== 'amm' && (
        <Typography variant="body" size="large">
          2. Choose type
        </Typography>
      )}
      <Box
        display="flex"
        borderRadius="xs"
        overflow="hidden"
        bg="lowestContainer"
        flexDirection="column"
      >
        <PoolFormWithdrawReceiveTokens />
      </Box>
    </Box>
  );
};

export default PoolFormWithdrawReceive;
