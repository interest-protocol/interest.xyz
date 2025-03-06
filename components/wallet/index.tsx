import { Box } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC } from 'react';

import ConnectWalletButton from './connect-wallet';
import Profile from './profile';

const Wallet: FC = () => {
  const { account } = useAptosWallet();

  return (
    <Box gap="m" display="flex" alignItems="center" justifyContent="flex-end">
      <Box
        width="14.5rem"
        justifyContent="flex-end"
        display={['none', 'none', 'none', 'flex']}
      />

      {account?.address ? <Profile /> : <ConnectWalletButton />}
    </Box>
  );
};

export default Wallet;
