import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Sidebar from '@/components/sidebar';
import { ChevronDownSVG, LogoSVG } from '@/components/svg';
import { useModal } from '@/hooks/use-modal';

import { LogoWrapperProps } from './header.types';

const LogoWrapper: FC<LogoWrapperProps> = ({ isShort }) => {
  const { setModal, handleClose } = useModal();

  const handleOpenModal = () =>
    setModal(
      <Motion
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <Sidebar onClose={handleClose} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        onClose: handleClose,
      }
    );

  return (
    <Box
      color="#9CA3AF"
      display="flex"
      alignItems="center"
      gap="0.813rem"
      cursor="pointer"
    >
      <Box
        display="flex"
        height="2.5rem"
        color="onSurface"
        alignItems="center"
        justifyContent="center"
        width={isShort ? '2.5rem' : `8.5rem`}
      >
        <LogoSVG
          width="100%"
          maxWidth="100%"
          maxHeight="100%"
          isShort={isShort}
        />
      </Box>
      <ChevronDownSVG
        maxHeight="1rem"
        maxWidth="1rem"
        width="100%"
        onClick={handleOpenModal}
      />
    </Box>
  );
};

export default LogoWrapper;