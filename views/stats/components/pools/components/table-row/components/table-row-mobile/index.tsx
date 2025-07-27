import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CellText from '@/views/stats/components/cell-text';

import { PoolsProps } from '../../../../pools.types';

const TableRowMobile: FC<PoolsProps> = ({
  rank,
  token,
  transactions,
  tvl,
  volume24h,
  volume7d,
  apr1d,
}) => (
  <Box p="m" display="flex" flexDirection="column" gap="0.25rem">
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF80">#:</CellText>
      <CellText color="#FFFFFF">{rank}</CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">Token Name:</CellText>
      <Box display="flex" gap="0.5rem" alignItems="center">
        <img
          width={20}
          height={20}
          alt={`${token} logo`}
          src="/android-icon-36x36.png"
          style={{
            objectFit: 'cover',
            borderRadius: '50%',
          }}
        />
        <CellText color="#FFFFFF">{token}</CellText>
      </Box>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">Transactions:</CellText>
      <CellText color="#FFFFFF">{transactions}</CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">TVL:</CellText>
      <CellText color="#FFFFFF">{tvl}</CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">24h Volume:</CellText>
      <CellText color="#FFFFFF">{volume24h}</CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">7D Volume:</CellText>
      <CellText color="#FFFFFF">{volume7d}</CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">1D APR:</CellText>
      <CellText color="#FFFFFF">{apr1d}</CellText>
    </Box>
  </Box>
);

export default TableRowMobile;
