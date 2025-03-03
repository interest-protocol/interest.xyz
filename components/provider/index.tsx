import { FC, PropsWithChildren } from 'react';

import { ModalProvider } from '@/context/modal';
import { AptosProvider } from '@/lib/aptos-provider';
import CoinsManager from '@/lib/coins-manager';

import ThemeManager from '../theme-manager';

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <AptosProvider
      defaultNetwork="mainnet"
      networks={[
        {
          network: 'mainnet',
          rpc: 'https://mainnet.movementnetwork.xyz/v1',
          faucet: 'https://mizu.mainnet.movementnetwork.xyz/',
          indexer: 'https://indexer.mainnet.movementnetwork.xyz/v1/graphql',
        },
      ]}
    >
      <CoinsManager />
      <ModalProvider>{children}</ModalProvider>
    </AptosProvider>
  </ThemeManager>
);

export default Provider;
