import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import LabelText from '../label-text';
import { TokenCellProps } from './token-cell.types';

const TokenCell: FC<TokenCellProps> = ({ icon, label, width }) => (
  <Box width={width} display="flex" alignItems="center" gap="0.5rem">
    <img src={icon} alt={label} width={32} height={32} />
    <LabelText>{label}</LabelText>
  </Box>
);

export default TokenCell;
