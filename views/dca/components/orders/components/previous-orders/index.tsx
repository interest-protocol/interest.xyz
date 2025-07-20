import { FC } from 'react';

import { mockData } from '../orders.data';
import TableOrders from '../table-orders';

const PreviousOrders: FC = () => <TableOrders data={mockData} />;

export default PreviousOrders;
