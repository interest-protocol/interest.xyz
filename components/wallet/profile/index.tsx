import { Box } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC } from 'react';

import Avatar from '@/components/account-info/avatar';
import { useModal } from '@/hooks/use-modal';

import MenuProfile from './menu-profile';

const Profile: FC = () => {
  const { account: currentAccount, disconnect } = useAptosWallet();

  const { setModal, handleClose } = useModal();

  const handleOpenModal = () =>
    setModal(
      <MenuProfile
        onClose={handleClose}
        onDisconnect={() => {
          handleClose();
          disconnect();
        }}
      />,
      {
        isOpen: true,
        custom: true,
        onClose: handleClose,
      }
    );

  return (
    <Box
      display="flex"
      cursor="pointer"
      flexDirection="column"
      justifyContent="center"
      bg={'#9CA3AF1A'}
      position={'relative'}
      borderRadius="0.75rem"
      border="1px solid #9CA3AF1A"
      nHover={{
        bg: '#9CA3AF33',
      }}
      transition="all 300ms ease-in-out"
    >
      <Box
        gap="m"
        display={'flex'}
        alignItems="center"
        onClick={handleOpenModal}
      >
        <Avatar
          withNameOrAddress
          nameOrAddressPosition="left"
          accountAddress={currentAccount?.address}
        />
      </Box>
    </Box>
  );
};

export default Profile;
