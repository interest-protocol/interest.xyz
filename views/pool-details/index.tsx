import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import PoolTitleBar from '../components/pool-title-bar';
import { usePoolDetails } from './pool-details.context';
import PoolForm from './pool-form';
import PoolInfo from './pool-info';

const PoolTitle: FC = () => {
  const { push } = useRouter();
  const { pool, loading } = usePoolDetails();

  console.log({ pool });

  return (
    <PoolTitleBar
      loading={!pool || loading}
      onBack={() => push(Routes[RoutesEnum.Pools])}
    />
  );
};

const PoolDetails: FC = () => (
  <Layout>
    <Box>
      <PoolTitle />
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
        <PoolForm />
        <PoolInfo />
      </Box>
    </Box>
  </Layout>
);

export default PoolDetails;
