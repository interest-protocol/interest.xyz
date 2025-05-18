import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { useMetrics } from '@/hooks';

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
        value={metrics?.summary.tvl || '0'}
        isLoading={loading}
        title="TVL"
      />
      <HeaderInfoCard
        value={metrics?.summary.volume || '0'}
        title="Cumulative Volume"
        isLoading={loading}
        isVolume
      />
      <HeaderInfoCard
        value={metrics?.summary.volume1D || '0'}
        title="Trading Volume (24H)"
        isLoading={loading}
        isVolume
      />
    </Box>
  );
};

export default HeaderMetrics;
