import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Sidebar from '@/components/sidebar';
import { ChevronDownSVG, LogoSVG } from '@/components/svg';
import { useModal } from '@/hooks/use-modal';

import { LogoWrapperProps } from './header.types';

const LogoWrapper: FC<LogoWrapperProps> = ({ isShort }) => {
  const { setModal, handleClose } = useModal();

  const handleOpenModal = () =>
    setModal(<Sidebar onClose={handleClose} />, {
      isOpen: true,
      custom: true,
      onClose: handleClose,
    });

  return (
    <Box
      display="flex"
      gap="0.813rem"
      color="#9CA3AF"
      cursor="pointer"
      alignItems="center"
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
