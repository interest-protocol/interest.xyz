import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ChevronDownSVG, LogoSVG } from '@/components/svg';

import { LogoWrapperProps } from './header.types';

const LogoWrapper: FC<LogoWrapperProps> = ({ isShort }) => (
  <Box
    color="#9CA3AF"
    display="flex"
    alignItems="center"
    gap="0.813rem"
    cursor="pointer"
  >
    <Box
      display="flex"
      height="2.5rem"
      color="onSurface"
      alignItems="center"
      justifyContent="center"
      width={isShort ? '2.5rem' : `8.5rem`}
    >
      <LogoSVG
        width="100%"
        maxWidth="100%"
        maxHeight="100%"
        isShort={isShort}
      />
    </Box>
    <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
  </Box>
);

export default LogoWrapper;
