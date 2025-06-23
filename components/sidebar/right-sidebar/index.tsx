import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SidebarClosed from './components/SidebarClosed';
import { IRightSidebarProps } from './right-sidebar.types';

const RightSidebar: FC<IRightSidebarProps> = ({ onClose, children }) => {
  return (
    <Box
      width="100%"
      display="flex"
      top="1.875rem"
      right="1.875rem"
      position="fixed"
      flexDirection="column"
    >
      <Box
        display="flex"
        transition="transform 0.3s ease-in-out"
        width={['100%', '100%', '100%', '27.5rem']}
        height={['100vh', '100vh', '100vh', '60rem']}
        flexDirection="row"
        transform={'translateX(0)'}
      >
        <SidebarClosed onClose={onClose} />
        {children}
      </Box>
    </Box>
  );
};

export default RightSidebar;
