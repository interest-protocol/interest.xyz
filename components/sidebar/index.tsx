import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SidebarClosed from './components/SidebarClosed';
import SidebarContent from './components/SidebarContent';
import { ISidebarProps } from './sidebar.types';

const Sidebar: FC<ISidebarProps> = ({ onClose }) => (
  <Box
    top="0"
    left="0"
    width="100%"
    display="flex"
    pt="1.875rem"
    pl="1.875rem"
    bg="#0000004D"
    position="fixed"
    flexDirection="column"
    backdropFilter="blur(10px)"
  >
    <Motion
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <Box
        display="flex"
        flexDirection="row"
        width={['100%', '100%', '100%', '18rem']}
        height={['100vh', '100vh', '100vh', '60rem']}
      >
        <SidebarContent />
        <SidebarClosed onClose={onClose} />
      </Box>
    </Motion>
  </Box>
);

export default Sidebar;
