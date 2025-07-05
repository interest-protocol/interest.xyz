import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import PoolTitleBar from '../components/pool-title-bar';
import { PoolTitleBarProps } from '../components/pool-title-bar/pool-title-bar.types';
import HeaderMetrics from './farm-form/header-metrics';
import HeaderPosition from './farm-form/header-position';
import { usePoolDetails } from './pool-details.context';
import { PoolDetailsMode } from './pool-details.types';
import PoolDetailsForm from './pool-details-form';
import PoolInfo from './pool-info';

const PoolTitle: FC<Pick<PoolTitleBarProps, 'modeState'>> = ({ modeState }) => {
  const { push } = useRouter();
  const { pool, loading } = usePoolDetails();

  return (
    <PoolTitleBar
      modeState={modeState}
      loading={!pool || loading}
      onBack={() => push(Routes[RoutesEnum.Pools])}
    />
  );
};

const PoolDetails: FC = () => {
  const [mode, setMode] = useState<PoolDetailsMode>(PoolDetailsMode.Liquidity);

  return (
    <Layout>
      <Box>
        <HeaderMetrics />
        <HeaderPosition />
        <PoolTitle modeState={[mode, setMode]} />
        <Box
          gap="xs"
          mx="auto"
          maxWidth="65rem"
          overflow="hidden"
          flexDirection="column"
          gridTemplateColumns="3fr 2fr"
          display={['flex', 'flex', 'flex', 'grid']}
          alignItems={['unset', 'unset', 'unset', 'start']}
        >
          <PoolDetailsForm mode={mode} />
          <PoolInfo mode={mode} />
        </Box>
      </Box>
    </Layout>
  );
};

export default PoolDetails;
