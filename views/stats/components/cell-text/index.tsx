import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CellTextProps } from './cell-text.types';

const CellText: FC<CellTextProps> = ({ children, color }) => (
  <Typography
    size="medium"
    variant="body"
    color={color}
    fontWeight="500"
    fontFamily="Inter"
    fontSize="0.875rem"
  >
    {children}
  </Typography>
);

export default CellText;
