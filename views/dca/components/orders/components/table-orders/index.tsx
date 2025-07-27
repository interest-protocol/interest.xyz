import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import NoCoin from '@/components/wallet/profile/menu-profile/tabs/no-coin';

import TableRowOrders from '../table-row-orders';
import { TableOrdersProps } from './table-order.types';
import { columns } from './table-orders-columns';

const TableOrders: FC<TableOrdersProps> = ({ data }) => (
  <Box
    width="100%"
    borderRadius="0.75rem"
    border="1px solid #1F2937"
    overflowX={['auto', 'visible']}
  >
    <Box
      gap="0.5rem"
      px={['0.5rem', '1rem']}
      width="100%"
      bg="#9CA3AF1A"
      display="grid"
      height="3.03125rem"
      alignItems="center"
      borderTopLeftRadius="0.5rem"
      borderTopRightRadius="0.5rem"
      gridTemplateColumns={['1fr', '2fr 2fr 2fr 2fr 2fr 2fr 2fr 0.1fr']}
    >
      {columns.map((label) => (
        <Box
          key={v4()}
          display={['none', 'flex']}
          gap="3rem"
          alignItems="center"
        >
          <Typography
            size="medium"
            variant="label"
            color="#FFFFFF"
            fontSize="1rem"
            fontWeight="500"
            fontFamily="Inter"
            display={['none', 'block']}
          >
            {label}
          </Typography>
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
      data.map((item) => <TableRowOrders key={v4()} {...item} />)
    )}
  </Box>
);

export default TableOrders;
