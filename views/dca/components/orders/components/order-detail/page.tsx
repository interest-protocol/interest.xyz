import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { useTabState } from '@/hooks/use-tab-manager';

import Breadcrumbs from './components/bread-crumbs';
import { breadcrumbItems } from './components/bread-crumbs.data';
import Orders from './components/orders';
import Overview from './components/overview';
import TabsInfo from './components/tabs-info';

const OrderInfo: FC = () => {
  const { tab } = useTabState();
  return (
    <Layout useContainer={false} ml={['0rem', '2.5rem']}>
      <Box display="flex" flexDirection="column">
        <Breadcrumbs breadcrumbs={breadcrumbItems} />
        <TabsInfo />
        {[<Overview key={v4()} />, <Orders key={v4()} />][tab]}
      </Box>
    </Layout>
  );
};

export default OrderInfo;
