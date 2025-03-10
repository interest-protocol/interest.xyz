import { Network } from '@interest-protocol/interest-aptos-v2';
import { FC, PropsWithChildren } from 'react';

import { INDEXER_URL, RPC_URL } from '@/constants';
import { ExposedCoinsProvider } from '@/context/exposedCoins';
import { ModalProvider } from '@/context/modal';
import { AptosProvider } from '@/lib/aptos-provider';
import CoinsManager from '@/lib/coins-manager';

import ThemeManager from '../theme-manager';

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <AptosProvider
      defaultNetwork={Network.MovementMainnet}
      networks={[
        {
          network: Network.MovementMainnet,
          rpc: RPC_URL[Network.MovementMainnet],
          indexer: INDEXER_URL[Network.MovementMainnet],
        },
      ]}
    >
      <CoinsManager />
      <ExposedCoinsProvider>
        <ModalProvider>{children}</ModalProvider>
      </ExposedCoinsProvider>
    </AptosProvider>
  </ThemeManager>
);

export default Provider;
