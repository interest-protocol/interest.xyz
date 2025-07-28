import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import TableRowDesktop from './components/table-row-desktop';
import TableRowMobile from './components/table-row-mobile';
import { TableRowOrdersProps } from './table-row-orders.types';

const TableRowOrders: FC<TableRowOrdersProps> = (props) => (
  <Box
    width="100%"
    bg="#030712"
    borderBottom="1px solid #1F2937"
    cursor="pointer"
    nHover={{
      bg: '#1F2937',
    }}
  >
    <Box display={['block', 'none']}>
      <TableRowMobile {...props} />
    </Box>
    <Box display={['none', 'block']}>
      <TableRowDesktop {...props} />
    </Box>
  </Box>
);

export default TableRowOrders;
