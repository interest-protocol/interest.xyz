import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CellText from '@/views/stats/components/cell-text';

import { TransactionProps } from '../../../../transactions.types';

const TableRowDesktop: FC<TransactionProps> = ({
  time,
  type,
  usdAmount,
  tokenAmount1,
  tokenAmount2,
  wallet,
}) => (
  <Box
    gap="m"
    px="1rem"
    height="4rem"
    display="grid"
    alignItems="center"
    gridTemplateColumns="1fr 3fr 2fr 2fr 2fr 2fr"
  >
    <CellText color="#FFFFFF80">{time}</CellText>
    <Box display="flex" gap="0.5rem" alignItems="center">
      <CellText color="#FFFFFF80">Remove</CellText>
      <img
        width={20}
        height={20}
        alt={`logo`}
        src="/android-icon-36x36.png"
        style={{
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
      <CellText color="#FFFFFF">{type}</CellText>
      <CellText color="#FFFFFF80">and</CellText>
      <img
        width={20}
        height={20}
        alt={`logo`}
        src="/android-icon-36x36.png"
        style={{
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
      <CellText color="#FFFFFF">{type}</CellText>
    </Box>
    <CellText color="#FFFFFF">{usdAmount}</CellText>
    <Box display="flex" gap="0.5rem" alignItems="center">
      <CellText color="#FFFFFF">{tokenAmount1}</CellText>
      <img
        width={20}
        height={20}
        alt={`logo`}
        src="/android-icon-36x36.png"
        style={{
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
    </Box>
    <Box display="flex" gap="0.5rem" alignItems="center">
      <CellText color="#FFFFFF">{tokenAmount2}</CellText>
      <img
        width={20}
        height={20}
        alt={`logo`}
        src="/android-icon-36x36.png"
        style={{
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
    </Box>
    <CellText color="#FFFFFF">{wallet}</CellText>
  </Box>
);

export default TableRowDesktop;
