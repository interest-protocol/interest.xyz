import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CaretLeft from '@/components/svg/caret-left';

import { ISidebarClosedProps } from './sidebar-closed.types';

const SidebarClosed: FC<ISidebarClosedProps> = ({ onClose, setIsHovered }) => {
  return (
    <Box
      p="1rem"
      width="3.5rem"
      height="100%"
      display="block"
      nHover={{
        bg: '#12131380',
        borderRadius: '0 0.75rem 0.75rem 0',
      }}
    >
      <CaretLeft
        maxWidth="20"
        maxHeight="20"
        cursor="pointer"
        onClick={onClose}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </Box>
  );
};

export default SidebarClosed;
