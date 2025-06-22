import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { IMenuClosedProps } from '@/components/menu/components/MenuClosed/menu-closed.types';
import CaretRight from '@/components/svg/caret-right';

const MenuClosed: FC<IMenuClosedProps> = ({ onClose }) => {
  return (
    <Box
      padding="1rem"
      width="3.5rem"
      height="60rem"
      nHover={{
        bg: '#12131380',
        borderRadius: '0.75rem 0 0 0.75rem',
      }}
      display="block"
    >
      <CaretRight
        maxWidth="20"
        maxHeight="20"
        cursor="pointer"
        onClick={onClose}
      />
    </Box>
  );
};

export default MenuClosed;
