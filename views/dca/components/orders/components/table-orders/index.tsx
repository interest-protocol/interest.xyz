import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import NoCoin from '@/components/wallet/profile/menu-profile/tabs/no-coin';

import RowTableOrders from '../row-table-orders';
import { TableOrdersProps } from './table-order.types';
import { columns } from './table-orders-columns';

const TableOrders: FC<TableOrdersProps> = ({ data }) => (
  <Box
    width="100%"
    display="flex"
    alignItems="center"
    overflow-x="auto"
    minHeight="25.3rem"
    borderRadius="0.75rem"
    border="1px solid #1F2937"
    flexDirection="column"
  >
    <Box
      width="100%"
      px="1rem"
      display="flex"
      bg="#9CA3AF1A"
      height="3.03125rem"
      alignItems="center"
      borderTopLeftRadius="0.5rem"
      borderTopRightRadius="0.5rem"
      justifyContent="space-between"
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

    {data.length === 0 ? (
      <Box
        flex="1"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <NoCoin />
      </Box>
    ) : (
      data.map((item) => <RowTableOrders key={v4()} {...item} />)
    )}
  </Box>
);

export default TableOrders;
