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
      color="#002A78"
      bg="#B4C5FF"
      variant="filled"
      nHover={{
        bg: '#8BA5FF',
      }}
      nFocus={{
        bg: '#1F1F1F',
      }}
      onClick={handleOpenModal}
      display="flex"
      justifyContent="center"
      fontFamily="Inter"
      fontWeight="500"
      fontSize="1rem"
      lineHeight="1.5rem"
      boxShadow="0px 1px 2px 0px #0000000D"
      borderRadius="12px"
      py="0.625rem"
      px="1.5rem"
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
