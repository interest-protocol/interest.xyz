import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import SidebarClosed from './components/SidebarClosed';
import SidebarContent from './components/SidebarContent';
import { ISidebarProps } from './sidebar.types';

const Sidebar: FC<ISidebarProps> = ({ onClose }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Motion
      layout
      top="0"
      left="0"
      width="100%"
      p="1.875rem"
      display="flex"
      bg="#0000004D"
      position="fixed"
      minHeight="100vh"
      flexDirection="column"
      backdropFilter="blur(10px)"
      transition={{ duration: 0.3 }}
    >
      <Box
        display="flex"
        flexDirection="row"
        width={['100%', '100%', '100%', '18rem']}
        height={['92vh', '90vh', '90vh', '60rem']}
      >
        <SidebarContent isHovered={isHovered} />
        <SidebarClosed onClose={onClose} setIsHovered={setIsHovered} />
      </Box>
    </Motion>
  );
};

export default Sidebar;
