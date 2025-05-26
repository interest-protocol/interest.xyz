import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { useMetrics } from '@/hooks';

import { PoolHeaderIconEnum } from './header.types';
import HeaderInfoCard from './header-info-card';

const HeaderMetrics: FC = () => {
  const { data: metrics, isLoading } = useMetrics();

  const loading = isLoading || !metrics;

  return (
    <Box
      width="100%"
      mb="m"
      display="grid"
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr 1fr', '1fr 1fr 1fr']}
      gap="m"
    >
      <HeaderInfoCard
        title="TVL"
        isLoading={loading}
        value={metrics?.summary.tvl || '0'}
        type={PoolHeaderIconEnum.tvl}
      />
      <HeaderInfoCard
        isLoading={loading}
        title="Cumulative Volume"
        type={PoolHeaderIconEnum.volume}
        value={metrics?.summary.volume || '0'}
      />
      <HeaderInfoCard
        isLoading={loading}
        title="Trading Volume (24H)"
        type={PoolHeaderIconEnum.volume}
        value={metrics?.summary.volume1D || '0'}
      />
    </Box>
  );
};

export default HeaderMetrics;
