import { Network } from '@interest-protocol/interest-aptos-v2';
import { FC, PropsWithChildren } from 'react';

import { INDEXER_URL, NETWORK, RPC_URL } from '@/constants';
import { ModalProvider } from '@/context/modal';
import { AptosProvider } from '@/lib/aptos-provider';
import CoinsManager from '@/lib/coins-manager';

import ThemeManager from '../theme-manager';

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <AptosProvider
      defaultNetwork={NETWORK[Network.MovementMainnet]}
      networks={[
        {
          rpc: RPC_URL[Network.MovementMainnet],
          network: NETWORK[Network.MovementMainnet],
          indexer: INDEXER_URL[Network.MovementMainnet],
        },
      ]}
    >
      <CoinsManager />
      <ModalProvider>{children}</ModalProvider>
    </AptosProvider>
  </ThemeManager>
);

export default Provider;
