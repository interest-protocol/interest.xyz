import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import useSrAmmPool from '@/hooks/use-sr-amm-pool';

import PoolTitleBar from '../components/pool-title-bar';
import { IPoolForm } from '../pools/pools.types';
import PoolForm from './pool-form';
import PoolInfo from './pool-info';

const PoolTitle: FC = () => {
  const { push } = useRouter();
  const { getValues } = useFormContext<IPoolForm>();
  const { pool, loading } = useSrAmmPool(getValues('pool.poolAddress'));

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
