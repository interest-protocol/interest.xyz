import { useContext } from 'react';

import networkContext from '.';

export const useNetworkContext = () => useContext(networkContext);
export const useNetwork = <T>() => useContext(networkContext).network as T;
