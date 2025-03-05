import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Button } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC } from 'react';

import { EXTERNAL_FAUCET_URL } from '@/constants';
import { useNetworkContext } from '@/lib/aptos-provider/network/network.hooks';

import ConnectWalletButton from './connect-wallet';
import Profile from './profile';

const Wallet: FC = () => {
  const { account } = useAptosWallet();
  const { network } = useNetworkContext();

  return (
    <Box gap="m" display="flex" alignItems="center" justifyContent="flex-end">
      {network !== 'mainnet' && (
        <a
          href={EXTERNAL_FAUCET_URL[Network.MovementMainnet]}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            px="m"
            bg="#1f1f1f"
            color="#fff"
            variant="outline"
            border="1px solid #FFDA34"
            borderRadius="m"
            nHover={{
              borderColor: '#ffda34ac',
              bg: '#1f1f1fbe',
              color: '#fff',
            }}
          >
            Mint
          </Button>
        </a>
      )}
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
