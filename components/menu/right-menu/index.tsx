import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import MenuClosed from './components/MenuClosed';
import { IRightMenuProps } from './right-menu.types';

const RightMenu: FC<IRightMenuProps> = ({ onClose, children }) => {
  return (
    <Box
      display="flex"
      position="fixed"
      transition="transform 0.3s ease-in-out"
      width={['100%', '100%', '100%', '27.5rem']}
      height={['100vh', '100vh', '100vh', '60rem']}
      flexDirection="row"
      transform={'translateX(0)'}
    >
      <MenuClosed onClose={onClose} />
      {children}
    </Box>
  );
};

export default RightMenu;
