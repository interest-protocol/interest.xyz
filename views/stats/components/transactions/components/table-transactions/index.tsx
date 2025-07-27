import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import HeaderText from '../../../header-text';
import TableRow from '../table-row';
import { data } from './table-transactions.data';

const TableTransactions: FC = () => {
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
        gridTemplateColumns={['1fr', '1fr 3fr 2fr 2fr 2fr 2fr']}
      >
        <HeaderText>Time</HeaderText>
        <HeaderText>Type</HeaderText>
        <HeaderText>USD Amount</HeaderText>
        <HeaderText>Token Amount</HeaderText>
        <HeaderText>Token Amount</HeaderText>
        <HeaderText>Wallet</HeaderText>
      </Box>

      {data.map((transaction) => (
        <TableRow key={v4()} {...transaction} />
      ))}
    </Box>
  );
};

export default TableTransactions;
