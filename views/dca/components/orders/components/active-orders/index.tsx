import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { mockData } from '../orders.data';
import TableOrders from '../table-orders';

const ActiveOrders: FC = () => (
  <Box width="100%" display="flex" flexDirection="column">
    <TableOrders data={mockData} />
  </Box>
);

export default ActiveOrders;
