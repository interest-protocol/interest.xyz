import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import Link from 'next/link';
import { FC } from 'react';

import { CopySVG, UserSVG } from '@/components/svg';
import { EXPLORER_URL } from '@/constants';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { copyToClipboard, formatAddress } from '@/utils';

import BalanceCard from '../balance-card';
import { AvatarProps } from './user-info.types';

const Avatar: FC<AvatarProps> = ({ accountAddress }) => {
  const network = useNetwork<Network>();
  const {
    account: currentAccount,
    name,
    allAvailableWallets,
  } = useAptosWallet();

  const walletImg = allAvailableWallets.find(
    (wallet) => wallet.name === name
  )?.iconUrl;

  const address = accountAddress ?? (currentAccount?.address || '');

  const SIZE = '4rem';

  const account = currentAccount?.address || '';

  const clipBoardSuccessMessage = 'Address copied to the clipboard';

  return (
    <Box
      display="flex"
      cursor="pointer"
      transition="0.3s"
      alignItems="center"
      boxShadow="0px 1px 2px 0px #0000000D"
      flexDirection="column"
      gap="1rem"
    >
      <Box border="0.65rem solid #1e1f1f" borderRadius="full">
        <Box
          bg="primary"
          width="4rem"
          height="4rem"
          display="flex"
          overflow="hidden"
          color="onPrimary"
          alignItems="center"
          borderRadius="full"
          justifyContent="center"
        >
          {walletImg ? (
            <img src={walletImg} alt={name} width="100%" />
          ) : (
            <UserSVG
              width="80%"
              height="80%"
              maxWidth={SIZE}
              maxHeight={SIZE}
            />
          )}
        </Box>
      </Box>
      <Box display="flex" gap="0.75rem">
        <Link
          target="_blank"
          href={EXPLORER_URL[network](`account/${address}`)}
        >
          <Typography
            size="large"
            variant="label"
            color="#E4E7E7"
            width="max-content"
            fontFamily="Inter"
            fontWeight="600"
            fontSize="1.25rem"
            lineHeight="1.5rem"
          >
            {formatAddress(address)}
          </Typography>
        </Link>
        <Button
          isIcon
          p="0 !important"
          cursor="pointer"
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
      <BalanceCard />
    </Box>
  );
};

export default Avatar;
