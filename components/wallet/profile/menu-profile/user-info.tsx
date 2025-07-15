import { Box } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC } from 'react';

import Avatar from './avatar';

const UserInfo: FC = () => {
  const { account: currentAccount } = useAptosWallet();

  return (
    <Box>
      <Box
        gap="l"
        display="flex"
        minWidth="14rem"
        alignItems="center"
        justifyContent="center"
      >
        <Avatar accountAddress={currentAccount!.address} />
      </Box>
    </Box>
  );
};

export default UserInfo;
