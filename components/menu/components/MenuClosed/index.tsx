import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CaretLeft from '@/components/svg/caret-left';

import { IMenuClosedProps } from './menu-closed.types';

const MenuClosed: FC<IMenuClosedProps> = ({ onClose }) => {
  return (
    <Box
      padding="1rem"
      width="3.5rem"
      height="60rem"
      nHover={{
        bg: '#12131380',
        borderRadius: '0 0.75rem 0.75rem 0',
      }}
      display="block"
    >
      <CaretLeft
        maxWidth="20"
        maxHeight="20"
        cursor="pointer"
        onClick={onClose}
      />
    </Box>
  );
};

export default MenuClosed;
