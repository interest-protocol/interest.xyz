import { Network } from '@aptos-labs/ts-sdk';
import { useWallet, WalletName } from '@aptos-labs/wallet-adapter-react';
import { getAptosWallets } from '@aptos-labs/wallet-standard';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowLeftSVG, TimesSVG } from '@/components/svg';
import { RPC_URL } from '@/constants';

import { ConnectWalletModalProps } from './connect-wallet.types';

const ConnectWalletModal: FC<ConnectWalletModalProps> = ({ handleClose }) => {
  const { wallets, connect } = useWallet();

  // Filter out unwanted wallets, remove duplicates, and sort with Nightly first
  const filteredWallets = wallets
    ? wallets
        .filter((wallet) => {
          const name = wallet.name.toLowerCase();
          return (
            !name.includes('petra') &&
            !name.includes('google') &&
            !name.includes('apple')
          );
        })
        .filter((wallet, index, self) => {
          // Remove duplicates based on wallet name
          return index === self.findIndex((w) => w.name === wallet.name);
        })
        .sort((a, b) => {
          // Nightly always first
          if (a.name.toLowerCase().includes('nightly')) return -1;
          if (b.name.toLowerCase().includes('nightly')) return 1;
          return 0;
        })
    : [];

  const handleWalletSelect = async (walletName: WalletName<string>) => {
    try {
      if (typeof window !== 'undefined') {
        const allWallets = getAptosWallets();
        const selectedWallet = allWallets.aptosWallets.find(
          (w) => w.name === walletName
        );

        if (selectedWallet?.features?.['aptos:connect']) {
          const networkInfo = {
            chainId: 126, // Movement Mainnet
            name: Network.MAINNET,
            url: RPC_URL[Network.MAINNET],
          };

          try {
            const result = await selectedWallet.features[
              'aptos:connect'
            ].connect(false, networkInfo);

            if (result.status === 'Approved') {
              await connect(walletName);
              handleClose();
              return;
            }
          } catch (connectError) {
            /* empty */
          }
        }
      }

      await connect(walletName);
      handleClose();
    } catch (error) {
      // Silent error - wallet adapter will handle error display
    }
  };

  return (
    <Box
      p="2xl"
      gap="2xl"
      width="35rem"
      bg="container"
      display="flex"
      maxWidth="95vw"
      borderRadius="2xs"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" gap="s">
          <Typography variant="headline" size="small" color="onSurface">
            Connect a wallet
          </Typography>
          <Typography variant="label" size="medium" color="outline">
            Please select a wallet to connect to this dapp:
          </Typography>
        </Box>
        <Button
          isIcon
          m="-0.5rem"
          variant="text"
          color="outline"
          onClick={handleClose}
        >
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap="s">
        {filteredWallets.map((wallet) => (
          <Button
            key={v4()}
            px="s"
            variant="tonal"
            color="onSurface"
            borderRadius="xs"
            onClick={() => handleWalletSelect(wallet.name)}
          >
            <Box as="span" display="flex" alignItems="center" gap="s">
              <img src={wallet.icon} alt={wallet.name} width="40" />
              <Typography as="span" size="large" variant="label">
                {wallet.name}
              </Typography>
            </Box>
            <Box>
              <Box
                as="span"
                rotate="180deg"
                display="inline-flex"
                transformOrigin="50% 50%"
              >
                <ArrowLeftSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
              </Box>
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ConnectWalletModal;
