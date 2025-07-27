import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CellText from '../../../../../cell-text';
import { TokenProps } from '../../../../tokens.types';

const TableRowDesktop: FC<TokenProps> = ({
  rank,
  token,
  price,
  hour,
  day,
  fdv,
  volume,
}) => (
  <Box
    gap="m"
    px="1rem"
    height="4rem"
    display="grid"
    alignItems="center"
    gridTemplateColumns="2fr 2fr 2fr 2fr 2fr 2fr"
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
    <CellText color="#FFFFFF">{price}</CellText>
    <CellText color={hour.startsWith('+') ? '#157F3D' : '#EF4444'}>
      {hour}
    </CellText>
    <CellText color={day.startsWith('-') ? '#EF4444' : '#157F3D'}>
      {day}
    </CellText>
    <CellText color="#FFFFFF">{fdv}</CellText>
    <CellText color="#FFFFFF">{volume}</CellText>
  </Box>
);

export default TableRowDesktop;
