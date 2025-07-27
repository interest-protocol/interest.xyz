import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import HeaderText from '../../../header-text';
import TableRow from '../table-row';
import { data } from './table-tokens.data';

const TableTokens: FC = () => {
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
        gridTemplateColumns={['1fr', '2fr 2fr 2fr 2fr 2fr 2fr']}
      >
        <Box display={['none', 'flex']} gap="3rem" alignItems="center">
          <HeaderText>#</HeaderText>
          <HeaderText>Token Name</HeaderText>
        </Box>
        <HeaderText>Price</HeaderText>
        <HeaderText>1 hour</HeaderText>
        <HeaderText>1 day</HeaderText>
        <HeaderText>FDV</HeaderText>
        <HeaderText>Volume</HeaderText>
      </Box>

      {data.map((token) => (
        <TableRow key={v4()} {...token} />
      ))}
    </Box>
  );
};

export default TableTokens;
