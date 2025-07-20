import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import RowTableOrders from '../row-table-orders';
import { TableOrdersProps } from './table-order.types';
import { columns } from './table-orders-columns';

const TableOrders: FC<TableOrdersProps> = ({ data }) => (
  <Box width="100%" borderRadius="0.75rem">
    <Box
      px="1rem"
      display="flex"
      bg="#9CA3AF1A"
      height="3.03125rem"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="8px 8px 0 0"
      borderBottom="1px solid #1F2937"
    >
      {columns.map(({ label, width }) => (
        <Box
          key={v4()}
          width={width}
          color="#FFFFFF"
          fontSize="1rem"
          fontWeight="500"
          fontFamily="Inter"
        >
          {label}
        </Box>
      ))}
    </Box>

    {data.map((item) => (
      <RowTableOrders key={v4()} {...item} />
    ))}
  </Box>
);

export default TableOrders;
