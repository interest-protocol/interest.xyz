import { Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { useModal } from '@/hooks/use-modal';

import ConnectWalletModal from './connect-wallet-modal';

const ConnectWalletButton: FC = () => {
  const { setModal, handleClose } = useModal();

  const handleOpenModal = () =>
    setModal(<ConnectWalletModal handleClose={handleClose} />, {
      isOpen: true,
      custom: true,
      onClose: handleClose,
    });

  return (
    <Button
      bg="#B4C5FF"
      color="#002A78"
      variant="filled"
      nHover={{
        bg: '#8BA5FF',
      }}
      display="flex"
      boxShadow="0px 1px 2px 0px #0000000D"
      onClick={handleOpenModal}
      justifyContent="center"
      fontFamily="Inter"
      fontWeight="500"
      fontSize="1rem"
      lineHeight="1.5rem"
      borderRadius="12px"
      py="0.625rem"
      px="1.5rem"
    >
      Connect
      <Typography
        as="span"
        size="large"
        variant="body"
        fontFamily="Inter"
        fontWeight="500"
        fontSize="1rem"
        lineHeight="1.5rem"
        display={['none', 'none', 'inline']}
      >
        Wallet
      </Typography>
    </Button>
  );
};

export default ConnectWalletButton;
