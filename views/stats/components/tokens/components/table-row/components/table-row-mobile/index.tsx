import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CellText from '../../../../../cell-text';
import { TokenProps } from '../../../../tokens.types';

const TableRowMobile: FC<TokenProps> = ({
  rank,
  token,
  price,
  hour,
  day,
  fdv,
  volume,
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
      <CellText color="#FFFFFF">Price:</CellText>
      <CellText color="#FFFFFF">{price}</CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">1h:</CellText>
      <CellText color={hour.startsWith('+') ? '#157F3D' : '#EF4444'}>
        {hour}
      </CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">1d:</CellText>
      <CellText color={day.startsWith('-') ? '#EF4444' : '#157F3D'}>
        {day}
      </CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">FDV:</CellText>
      <CellText color="#FFFFFF">{fdv}</CellText>
    </Box>
    <Box display="flex" gap="0.5rem">
      <CellText color="#FFFFFF">Volume:</CellText>
      <CellText color="#FFFFFF">{volume}</CellText>
    </Box>
  </Box>
);

export default TableRowMobile;
