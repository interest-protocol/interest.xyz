import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import Layout from '@/components/layout';

import FarmFilter from '../components/farm-filter';
import Header from './header';
import { FILTERS_DATA } from './pool.data';
import PoolCardList from './pool-card-list';
import { PoolTabEnum } from './pools.types';

const Pools: FC = () => {
  const [tab, setTab] = useState<PoolTabEnum>(PoolTabEnum.Pools);

  return (
    <Layout>
      <Box py="xl">
        <Header setTab={setTab} currentTab={tab} />
      </Box>
      <Box
        px="s"
        gap="2xs"
        display="flex"
        bg="container"
        maxWidth="100%"
        maxHeight="100%"
        borderRadius="xs"
        minHeight="30rem"
        flexDirection="column"
        py={['s', 's', 's', '2xl']}
      >
        <FarmFilter filterData={FILTERS_DATA} />
        <PoolCardList tab={tab} />
      </Box>
    </Layout>
  );
};

export default Pools;
