import { Network } from '@aptos-labs/ts-sdk';
import { getAptosWallets, NetworkInfo } from '@aptos-labs/wallet-standard';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowLeftSVG, TimesSVG } from '@/components/svg';

import { CUSTOM_WALLETS } from './connect-wallet.data';
import { ConnectWalletModalProps } from './connect-wallet.types';

const ConnectWalletModal: FC<ConnectWalletModalProps> = ({ handleClose }) => {
  const wallets = getAptosWallets();
  const aptosWallets = wallets.aptosWallets;
  const { allAvailableWallets, select } = useAptosWallet();

  const handleConnect = async (name: string) => {
    if (!allAvailableWallets.length)
      return window.open(name, '_blank')?.focus();

    const networkInfo: NetworkInfo = {
      chainId: 126,
      name: Network.CUSTOM,
    };

    await select(name);

    const wallet = aptosWallets.find((w) => w.name === name)!;

    if (wallet.name === 'Nightly') {
      await (wallet as any).changeNetwork(networkInfo);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    handleClose();
  };

  const WALLETS = !allAvailableWallets.length
    ? CUSTOM_WALLETS
    : allAvailableWallets;

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
        {WALLETS.map(({ label, name, iconUrl, downloadUrl }) => (
          <Button
            key={v4()}
            px="s"
            variant="tonal"
            color="onSurface"
            borderRadius="xs"
            onClick={() =>
              handleConnect(
                allAvailableWallets.length
                  ? name
                  : downloadUrl.browserExtension || ''
              )
            }
          >
            <Box as="span" display="flex" alignItems="center" gap="s">
              <img src={iconUrl} alt={label} width="40" />
              <Typography as="span" size="large" variant="label">
                {label}
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
