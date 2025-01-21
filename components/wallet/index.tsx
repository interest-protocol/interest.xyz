import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Button } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC } from 'react';

import { EXTERNAL_FAUCET_URL } from '@/constants';

import MovementNetwork from '../account-info/movement-network';
import ConnectWalletButton from './connect-wallet';
import Profile from './profile';

const Wallet: FC = () => {
  const { account } = useAptosWallet();

  return (
    <Box gap="m" display="flex" alignItems="center" justifyContent="flex-end">
      <a
        href={EXTERNAL_FAUCET_URL[Network.Porto]}
        target="_blank"
        rel="noreferrer"
      >
        <Button
          color="#fff"
          variant="outline"
          px="m"
          border="1px solid #FFDA34"
          borderRadius="m"
          nHover={{ borderColor: '#ffda34ac', bg: 'unset', color: '#fff' }}
        >
          Mint
        </Button>
      </a>
      <Box
        gap="l"
        justifyContent="flex-end"
        display={['none', 'none', 'none', 'flex']}
      >
        <MovementNetwork />
      </Box>
      {account?.address ? <Profile /> : <ConnectWalletButton />}
    </Box>
  );
};

export default Wallet;
