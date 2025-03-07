import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import Link from 'next/link';
import { FC } from 'react';

import { UserSVG } from '@/components/svg';
import { EXPLORER_URL } from '@/constants';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import { AvatarProps } from './account-info.types';

const Avatar: FC<AvatarProps> = ({
  isLarge,
  accountAddress,
  withNameOrAddress,
}) => {
  const network = useNetwork<Network>();
  const { account: currentAccount } = useAptosWallet();
  const address = accountAddress ?? (currentAccount?.address || '');

  const SIZE = isLarge ? '2.2rem' : '1.5rem';

  return (
    <>
      <Box
        bg="primary"
        width={SIZE}
        height={SIZE}
        display="flex"
        color="onPrimary"
        alignItems="center"
        borderRadius="full"
        justifyContent="center"
      >
        <UserSVG width="80%" height="80%" maxWidth={SIZE} maxHeight={SIZE} />
      </Box>
      {withNameOrAddress && (
        <Link
          target="_blank"
          href={EXPLORER_URL[network](`/account/${address}`)}
        >
          <Typography
            mr="0.5rem"
            size="large"
            variant="label"
            color="onSurface"
            width="max-content"
          >
            {address.slice(0, 6)}...{address.slice(-4)}
          </Typography>
        </Link>
      )}
    </>
  );
};

export default Avatar;
