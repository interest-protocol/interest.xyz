import { toPairs } from 'ramda';
import { useContext } from 'react';

import { NETWORK } from '@/constants';

import networkContext from '.';

export const useNetworkContext = () => useContext(networkContext);
export const useNetwork = <T>() => {
  const network = useContext(networkContext).network;

  return toPairs(NETWORK).find(([, key]) => key === network)![0] as T;
};
