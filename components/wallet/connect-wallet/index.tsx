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
      color="#fff"
      px={['s', 'l']}
      bg="#1F1F1F"
      borderRadius="m"
      variant="filled"
      border="1px solid #B4C5FF"
      nHover={{
        borderColor: '#B4C5FF',
        bg: '#1f1f1fbe',
        color: '#fff',
      }}
      nFocus={{
        bg: '#1F1F1F',
      }}
      onClick={handleOpenModal}
    >
      Connect
      <Typography
        as="span"
        size="large"
        variant="label"
        display={['none', 'none', 'inline']}
      >
        Wallet
      </Typography>
    </Button>
  );
};

export default ConnectWalletButton;
