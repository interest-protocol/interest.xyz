import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import MenuClosed from './components/SidebarClosed';
import MenuContent from './components/SidebarContent';
import { ISidebarProps } from './sidebar.types';

const Sidebar: FC<ISidebarProps> = ({ onClose }) => {
  return (
    <Box
      display="flex"
      position="fixed"
      transition="transform 0.3s ease-in-out"
      width={['100%', '100%', '100%', '18rem']}
      height={['100vh', '100vh', '100vh', '60rem']}
      flexDirection="row"
      transform={'translateX(0)'}
    >
      <MenuContent />
      <MenuClosed onClose={onClose} />
    </Box>
  );
};

export default Sidebar;
