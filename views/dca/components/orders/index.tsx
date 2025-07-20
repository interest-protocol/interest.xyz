import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useTabState } from '@/hooks/use-tab-manager';

import ActiveOrders from './components/active-orders';
import OrdersTabs from './components/orders-tabs';
import PreviousOrders from './components/previous-orders';

const Orders: FC = () => {
  const { tab } = useTabState();

  return (
    <Box display="flex" flexDirection="column">
      <OrdersTabs />
      {[<ActiveOrders key={v4()} />, <PreviousOrders key={v4()} />][tab]}
    </Box>
  );
};

export default Orders;
