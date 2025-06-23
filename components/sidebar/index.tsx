import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SidebarClosed from './components/SidebarClosed';
import SidebarContent from './components/SidebarContent';
import { ISidebarProps } from './sidebar.types';

const Sidebar: FC<ISidebarProps> = ({ onClose }) => {
  return (
    <Box
      width="100%"
      display="flex"
      top="1.875rem"
      left="1.875rem"
      position="fixed"
      flexDirection="column"
    >
      <Box
        display="flex"
        flexDirection="row"
        transform={'translateX(0)'}
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
