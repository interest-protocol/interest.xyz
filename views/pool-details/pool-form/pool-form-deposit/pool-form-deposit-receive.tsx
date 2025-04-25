import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';

const PoolFormDepositReceive: FC = () => {
  const { loading } = usePoolDetails();
  const { control } = useFormContext<IPoolForm>();
  const value = useWatch({ control, name: 'lpCoin.value' });
  const symbol = useWatch({ control, name: 'lpCoin.symbol' });

  return (
    <Box>
      <Typography variant="body" size="large" mt="m" mb="xs">
        Receive:
      </Typography>
      <Box borderRadius="xs" bg="lowestContainer" py="xs">
        <Box
          py="xs"
          px="m"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body" size="large">
            {loading ? <Skeleton width="4rem" /> : symbol}
          </Typography>
          <Typography variant="body" ml="m" size="large">
            {loading ? <Skeleton width="2rem" /> : value || 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolFormDepositReceive;
