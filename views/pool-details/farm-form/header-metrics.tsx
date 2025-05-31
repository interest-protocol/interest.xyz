import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useMetrics } from '@/hooks';
import { PoolHeaderIconEnum } from '@/views/pools/header/header.types';
import HeaderInfoCard from '@/views/pools/header/header-info-card';
import { IPoolForm } from '@/views/pools/pools.types';

import { MetricPoolDetails } from './farm-form.types';

const DEFAULT_METRIC: MetricPoolDetails = {
  tvl: 'N/A',
  farmApr: 'N/A',
  volume1D: 'N/A',
  apr: 'N/A',
};

const HeaderMetrics: FC = () => {
  const { getValues } = useFormContext<IPoolForm>();
  const [metric, setMetric] = useState<MetricPoolDetails>(DEFAULT_METRIC);
  const { data: metrics, isLoading } = useMetrics();

  const loading = isLoading || !metrics;

  useEffect(() => {
    if (metric.tvl == 'N/A') {
      const tmpMetric = metrics?.data?.filter(
        (metric) => metric.poolId == getValues('pool.poolAddress')
      );
      setMetric(tmpMetric?.length ? tmpMetric[0].metrics : DEFAULT_METRIC);
    }
  }, [isLoading, metrics]);

  if (!isLoading && !metrics?.data)
    return (
      <Box
        width="100%"
        display="flex"
        mb="m"
        gap="m"
        bg="#f6465d7d"
        p="s"
        maxWidth="65rem"
        mx="auto"
        borderRadius="1rem"
        justifyContent="center"
      >
        <a
          href="http://discord.gg/movementlabsxyz"
          target="_blank"
          rel="noreferrer"
        >
          <Typography
            size="small"
            color="#909094"
            textAlign="center"
            variant="headline"
            fontSize={['0.85rem', '0.85rem', '1rem']}
          >
            Movement RPC under Maintenance. Contact us on discord
          </Typography>
        </a>
      </Box>
    );

  return (
    <Box
      mb="m"
      gap="m"
      width="100%"
      mx="auto"
      maxWidth="65rem"
      display="grid"
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr 1fr', '1fr 1fr 1fr']}
    >
      <HeaderInfoCard
        title="APR"
        isLoading={loading}
        type={PoolHeaderIconEnum.apr}
        value={metric ? `${Number(metric.farmApr) + Number(metric.apr)}` : '0'}
      />
      <HeaderInfoCard
        title="TVL"
        isLoading={loading}
        type={PoolHeaderIconEnum.tvl}
        value={metric ? metric.tvl : '0'}
      />
      <HeaderInfoCard
        isLoading={loading}
        title="Trading Volume (24H)"
        type={PoolHeaderIconEnum.volume}
        value={metric ? metric.volume1D : '0'}
      />
    </Box>
  );
};

export default HeaderMetrics;
