import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SidebarClosed from './components/SidebarClosed';
import SidebarContent from './components/SidebarContent';
import { ISidebarProps } from './sidebar.types';

const Sidebar: FC<ISidebarProps> = ({ onClose }) => {
  return (
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
      <Box
        display="flex"
        flexDirection="row"
        transition="transform 0.3s ease-in-out"
        width={['100%', '100%', '100%', '18rem']}
        height={['100vh', '100vh', '100vh', '60rem']}
      >
        <SidebarContent />
        <SidebarClosed onClose={onClose} />
      </Box>
    </Box>
  );
};

export default Sidebar;
