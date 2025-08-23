import { AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { type FC, type PropsWithChildren } from 'react';

import { RPC_URL } from '@/constants';

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const aptosConfig = new AptosConfig({
    network: Network.MAINNET,
    fullnode: RPC_URL[Network.MAINNET],
  });
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={aptosConfig}
      onError={(error) => {
        console.error('Wallet error:', JSON.stringify(error, null, 2));
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};
