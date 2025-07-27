import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import HeaderText from '../../../header-text';
import TableRow from '../table-row';
import { data } from './table-pools.data';

const TablePools: FC = () => {
  return (
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
        gridTemplateColumns={['1fr', '1fr 2fr 1fr 1fr 1fr 1fr 1fr']}
      >
        <Box display={['none', 'flex']} gap="3rem" alignItems="center">
          <HeaderText>#</HeaderText>
          <HeaderText>Token Name</HeaderText>
        </Box>
        <HeaderText>Transactions</HeaderText>
        <HeaderText>TVL</HeaderText>
        <HeaderText>24h Volume</HeaderText>
        <HeaderText>7D Volume</HeaderText>
        <HeaderText>1D APR</HeaderText>
      </Box>

      {data.map((pool) => (
        <TableRow key={v4()} {...pool} />
      ))}
    </Box>
  );
};

export default TablePools;
