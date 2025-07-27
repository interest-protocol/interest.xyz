import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { LabelTextProps } from './label-text.types';

const LabelText: FC<LabelTextProps> = ({
  children,
  color = '#FFFFFF',
  fontWeight = 'normal',
  cursor = 'default',
  fontSize = '0.875rem',
  size = 'medium',
}) => (
  <Typography
    size={size}
    variant="label"
    color={color}
    cursor={cursor}
    fontWeight={fontWeight}
    fontFamily="Inter"
    fontSize={fontSize}
  >
    {children}
  </Typography>
);

export default LabelText;
