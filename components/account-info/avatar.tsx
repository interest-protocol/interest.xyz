import { Box, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import Link from 'next/link';
import { FC } from 'react';

import { UserSVG } from '@/components/svg';
import { EXPLORER_URL, Network } from '@/constants';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { formatAddress } from '@/utils';

import { AvatarProps } from './account-info.types';

const Avatar: FC<AvatarProps> = ({
  isLarge,
  accountAddress,
  withNameOrAddress,
  nameOrAddressPosition = 'right',
}) => {
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

  const SIZE = isLarge ? '2.2rem' : '1.5rem';

  return (
    <Box
      p="xs"
      gap="s"
      display="flex"
      cursor="pointer"
      borderRadius="xs"
      transition="0.3s"
      alignItems="center"
      nHover={{ bg: 'highestContainer' }}
    >
      {withNameOrAddress && nameOrAddressPosition === 'left' && (
        <Typography
          ml="0.5rem"
          size="large"
          variant="label"
          color="onSurface"
          width="max-content"
          display={['none', 'none', 'none', 'block', 'block']}
        >
          {address.slice(0, 6)}...{address.slice(-4)}
        </Typography>
      )}
      <Box
        bg="primary"
        width={SIZE}
        height={SIZE}
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
          <UserSVG width="80%" height="80%" maxWidth={SIZE} maxHeight={SIZE} />
        )}
      </Box>
      {withNameOrAddress && nameOrAddressPosition === 'right' && (
        <Link
          target="_blank"
          href={EXPLORER_URL[network](`account/${address}`)}
        >
          <Typography
            mr="0.5rem"
            size="large"
            variant="label"
            color="onSurface"
            width="max-content"
          >
            {formatAddress(address)}
          </Typography>
        </Link>
      )}
    </Box>
  );
};

export default Avatar;
