import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useMetrics } from '@/hooks';
import { formatDollars } from '@/utils';

const HeaderMetrics: FC = () => {
  const { data: metrics, isLoading } = useMetrics();

  const loading = isLoading || !metrics;

  return (
    <Box color="onSurface" display="flex" alignItems="center" gap="m">
      <Typography as="p" variant="label" size="large">
        Volume:{' '}
        <Typography as="span" variant="label" size="large" color="primary">
          {loading ? (
            <Skeleton height="100%" width="4rem" />
          ) : metrics?.tvl ? (
            formatDollars(Number(metrics?.tvl))
          ) : (
            '--'
          )}
        </Typography>
      </Typography>
      •
      <Typography as="p" variant="label" size="large">
        TVL:{' '}
        <Typography as="span" variant="label" size="large" color="primary">
          {loading ? (
            <Skeleton height="100%" width="4rem" />
          ) : metrics?.volume ? (
            formatDollars(Number(metrics?.volume))
          ) : (
            '--'
          )}
        </Typography>
      </Typography>
    </Box>
  );
};

export default HeaderMetrics;
