import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CaretLeft from '@/components/svg/caret-left';
import CaretRight from '@/components/svg/caret-right';

import { IDirectionalClosedProps } from './directional-menu-closed.types';

const DirectionalMenuClosed: FC<IDirectionalClosedProps> = ({
  onClose,
  setIsHovered,
  isDirectionalRight,
}) => {
  return (
    <Box
      p="1rem"
      width="3.5rem"
      height="100%"
      display="block"
      nHover={{
        bg: '#12131380',
        borderRadius: isDirectionalRight
          ? '0.75rem 0 0 0.75rem'
          : '0 0.75rem 0.75rem 0',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isDirectionalRight ? (
        <CaretLeft
          maxWidth="20"
          maxHeight="20"
          cursor="pointer"
          onClick={onClose}
        />
      ) : (
        <CaretRight
          maxWidth="20"
          maxHeight="20"
          cursor="pointer"
          onClick={onClose}
        />
      )}
    </Box>
  );
};

export default DirectionalMenuClosed;
