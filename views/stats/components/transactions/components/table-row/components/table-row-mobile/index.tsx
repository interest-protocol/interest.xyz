import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CellText from '@/views/stats/components/cell-text';

import { TransactionProps } from '../../../../transactions.types';

const TableRowMobile: FC<TransactionProps> = ({
  time,
  type,
  usdAmount,
  tokenAmount1,
  tokenAmount2,
  wallet,
}) => (
  <Box p="m" display="flex" flexDirection="column" gap="0.25rem">
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">Time:</CellText>
      <CellText color="#FFFFFF80">{time}</CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">Type:</CellText>
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
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">USD Amount:</CellText>
      <CellText color="#FFFFFF">{usdAmount}</CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF80">Token Amount 1:</CellText>
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
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">Token Amount 2:</CellText>
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
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">Wallet:</CellText>
      <CellText color="#FFFFFF">{wallet}</CellText>
    </Box>
  </Box>
);

export default TableRowMobile;
