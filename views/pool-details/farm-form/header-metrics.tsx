import { Box } from '@interest-protocol/ui-kit';
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
  fees: 'N/A',
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
        value={metric ? `${Number(metric.farmApr) + Number(metric.fees)}` : '0'}
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
