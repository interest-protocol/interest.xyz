import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { HeaderTextProps } from './header-text.types';

const HeaderText: FC<HeaderTextProps> = ({ children }) => (
  <Typography
    size="medium"
    variant="label"
    color="#FFFFFF"
    fontSize="1rem"
    fontWeight="500"
    fontFamily="Inter"
    display={['none', 'block']}
  >
    {children}
  </Typography>
);

export default HeaderText;
