import { FC, PropsWithChildren } from 'react';

import { INDEXER_URL, Network, RPC_URL } from '@/constants';
import { ModalProvider } from '@/context/modal';
import { AptosProvider } from '@/lib/aptos-provider';
import CoinsManager from '@/lib/coins-manager';

import ThemeManager from '../theme-manager';

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <AptosProvider
      defaultNetwork={Network.MAINNET}
      networks={[
        {
          network: Network.MAINNET,
          rpc: RPC_URL[Network.MAINNET],
          indexer: INDEXER_URL[Network.MAINNET],
        },
      ]}
    >
      <CoinsManager />
      <ModalProvider>{children}</ModalProvider>
    </AptosProvider>
  </ThemeManager>
);

export default Provider;
