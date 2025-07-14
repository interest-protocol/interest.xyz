import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import SidebarClosed from './components/sidebar-closed';
import SidebarContent from './components/sidebar-content';
import { ISidebarProps } from './sidebar.types';

const Sidebar: FC<ISidebarProps> = ({ onClose }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Motion
      layout
      top="0"
      left="0"
      width="100%"
      px="1.875rem"
      display="flex"
      position="fixed"
      onClick={onClose}
      minHeight="100vh"
      flexDirection="column"
      justifyContent="center"
      backdropFilter="blur(10px)"
      exit={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Box
        display="flex"
        flexDirection="row"
        width={['100%', '100%', '100%', '18rem']}
        height="93vh"
      >
        <SidebarContent isHovered={isHovered} />
        <SidebarClosed onClose={onClose} setIsHovered={setIsHovered} />
      </Box>
    </Motion>
  );
};

export default Sidebar;
