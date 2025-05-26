import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { useMetrics } from '@/hooks';
import { formatMoney } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

const FarmFormAPR: FC = () => {
  const { getValues, setValue } = useFormContext<IPoolForm>();
  const [aprValue, setAprValue] = useState(getValues('apr') || '0.00');
  const { data: metrics, isLoading } = useMetrics();

  useEffect(() => {
    if (!isLoading && !getValues('apr')) {
      const volume = metrics?.data?.filter(
        (metric) => metric.poolId == getValues('pool.poolAddress')
      );
      if (volume) {
        const apr = formatMoney(+volume[0].metrics.farmApr);
        setValue('apr', apr);
        setAprValue(apr);
        return;
      } else setValue('apr', '0');
    }
  }, [isLoading]);

  return (
    <Box
      px="m"
      key={v4()}
      display="flex"
      cursor="pointer"
      alignItems="center"
      py={['m', 'unset']}
      borderRadius="full"
      bg="successContainer"
      color="onSuccessContainer"
      justifyContent="space-between"
      transition="all 350ms ease-in-out"
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body" size="medium">
          Farm APR:
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body" ml="xs" size="medium">
          {isLoading ? <Skeleton width="4rem" /> : aprValue}%
        </Typography>
      </Box>
    </Box>
  );
};

export default FarmFormAPR;
