import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { getAptosWallets } from '@aptos-labs/wallet-standard';
import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Avatar from '@/components/account-info/avatar';
import { CopySVG, LogoutSVG, SettingSVG } from '@/components/svg';
import { copyToClipboard } from '@/utils';

import { UserInfoProps } from './user-info.types';

const UserInfo: FC<UserInfoProps> = ({ handleSettings }) => {
  const { account: currentAccount, disconnect } = useWallet();

  const account = currentAccount?.address || '';

  const clipBoardSuccessMessage = 'Address copied to the clipboard';

  const handleDisconnect = async () => {
    const wallets = getAptosWallets();
    const aptosWallets = wallets.aptosWallets;

    const nightlyPosition = aptosWallets.findIndex(
      (obj) => '_nightlyEventsMap' in obj
    );

    if (nightlyPosition != -1)
      await aptosWallets[nightlyPosition].features[
        'aptos:disconnect'
      ].disconnect();

    disconnect();
  };

  return (
    <Box>
      <Box
        py="m"
        gap="l"
        display="flex"
        minWidth="14rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Box display="flex" alignItems="center" gap="l">
              <Avatar
                withNameOrAddress
                accountAddress={currentAccount!.address}
              />
              <Button
                isIcon
                p="0 !important"
                variant="text"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(account || '', clipBoardSuccessMessage);
                }}
                color="onSurface"
              >
                <CopySVG maxHeight="1rem" maxWidth="1rem" width="100%" />
              </Button>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap="2xs">
            <Button isIcon variant="text" p="0 !important">
              <SettingSVG
                width="1rem"
                height="1rem"
                maxHeight="100%"
                maxWidth="100%"
                onClick={handleSettings}
              />
            </Button>
            <Button
              isIcon
              variant="text"
              onClick={handleDisconnect}
              p="0 !important"
            >
              <LogoutSVG
                width="1rem"
                height="1rem"
                maxHeight="100%"
                maxWidth="100%"
              />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
