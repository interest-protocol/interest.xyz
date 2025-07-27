import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CellText from '@/views/stats/components/cell-text';

import { PoolsProps } from '../../../../pools.types';

const TableRowDesktop: FC<PoolsProps> = ({
  rank,
  token,
  transactions,
  tvl,
  volume24h,
  volume7d,
  apr1d,
}) => (
  <Box
    gap="m"
    px="1rem"
    height="4rem"
    display="grid"
    alignItems="center"
    gridTemplateColumns="1fr 2fr 1fr 1fr 1fr 1fr 1fr"
  >
    <Box display="flex" gap="3rem" alignItems="center">
      <CellText color="#FFFFFF80">{rank}</CellText>
      <Box display="flex" gap="0.5rem">
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
    <CellText color="#FFFFFF">{transactions}</CellText>
    <CellText color="#FFFFFF">{tvl}</CellText>
    <CellText color="#FFFFFF">{volume24h}</CellText>
    <CellText color="#FFFFFF">{volume7d}</CellText>
    <CellText color="#FFFFFF">{apr1d}</CellText>
  </Box>
);

export default TableRowDesktop;
