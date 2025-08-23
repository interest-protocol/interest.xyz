import { Network } from '@aptos-labs/ts-sdk';
import { createContext, type FC, type PropsWithChildren, useMemo } from 'react';

import { useNetwork } from '../network/network.hooks';
import type {
  AptosClientContext,
  AptosClientProviderProps,
} from './aptos-client.types';
import { getAptosClient } from './aptos-client.utils';

const aptosClientContext = createContext<AptosClientContext>(
  {} as AptosClientContext
);

export const AptosClientProvider: FC<
  PropsWithChildren<AptosClientProviderProps>
> = ({ children, networks }) => {
  const network = useNetwork<Network>();
  const { Provider } = aptosClientContext;

  const clients = useMemo<Record<string, AptosClientContext>>(
    () =>
      networks.reduce(
        (acc, item) => ({
          ...acc,
          [item.network]: getAptosClient(item),
        }),
        {}
      ),
    [networks]
  );

  return <Provider value={clients[network]}>{children}</Provider>;
};

export default aptosClientContext;
