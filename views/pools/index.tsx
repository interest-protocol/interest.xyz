import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import Layout from '@/components/layout';

import Header from './header';
import PoolCardList from './pool-card-list';
import PoolFilter from './pool-filter';
import { PoolTabEnum } from './pools.types';

const Pools: FC = () => {
  const [tab, setTab] = useState<PoolTabEnum>(PoolTabEnum.Pools);

  return (
    <Layout>
      <Box display="flex" flexDirection="column" flex="1">
        <Box py="xl">
          <Header setTab={setTab} currentTab={tab} />
        </Box>
        <Box
          px="s"
          flex="1"
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
          <PoolFilter />
          <PoolCardList tab={tab} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Pools;
