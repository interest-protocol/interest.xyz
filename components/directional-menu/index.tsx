import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren, useState } from 'react';

import { IDirectionalMenuProps } from './directional-menu.types';
import DirectionalMenuClosed from './directional-menu-closed';

const DirectionalMenu: FC<PropsWithChildren<IDirectionalMenuProps>> = ({
  onClose,
  children,
  isDirectionalRight,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Motion
      layout
      top="0"
      left="0"
      zIndex="9"
      width="100%"
      px="1.875rem"
      display="flex"
      position="fixed"
      onClick={onClose}
      minHeight="100vh"
      flexDirection="column"
      alignItems={isDirectionalRight ? 'end' : 'start'}
      justifyContent="center"
      backdropFilter="blur(10px)"
      exit={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: isDirectionalRight ? 20 : -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Box
        display="flex"
        flexDirection={isDirectionalRight ? 'row-reverse' : 'row'}
        width={['100%', '100%', '100%', isDirectionalRight ? '28rem' : '18rem']}
        height="93vh"
      >
        <Box
          p={isDirectionalRight ? 'unset' : '1.5rem'}
          bg="#121313"
          display="flex"
          overflowY="auto"
          border="1px solid"
          flexDirection="column"
          borderColor="#FFFFFF1A"
          justifyContent="space-between"
          onClick={(e) => e.stopPropagation()}
          width={[
            '90%',
            '90%',
            '90%',
            isDirectionalRight ? '28rem' : '14.5rem',
          ]}
          borderRadius={
            isHovered
              ? isDirectionalRight
                ? '0 0.75rem  0.75rem 0'
                : '0.75rem 0  0 0.75rem'
              : '0.75rem'
          }
        >
          {children}
        </Box>
        <DirectionalMenuClosed
          onClose={onClose}
          setIsHovered={setIsHovered}
          isDirectionalRight={isDirectionalRight}
        />
      </Box>
    </Motion>
  );
};

export default DirectionalMenu;
