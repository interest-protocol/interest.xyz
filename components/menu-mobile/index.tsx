import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import MainMenu from './main-menu';
import { MainMenuMobileProps } from './menu.types';

const MenuMobile: FC<MainMenuMobileProps> = ({ isOpen, closeMenu }) => {
  if (!isOpen) return null;

  return (
    <Box>
      <Box
        top="0"
        pt="l"
        left="0"
        zIndex={4}
        width="100vw"
        height="100vh"
        overflowY="auto"
        position="fixed"
        bg="container"
        display={['block', 'block', 'block', 'block', 'none']}
      >
        <MainMenu closeMenu={closeMenu} />
      </Box>
    </Box>
  );
};

export default MenuMobile;
