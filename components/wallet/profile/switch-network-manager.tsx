import { Network } from '@aptos-labs/ts-sdk';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC, useEffect, useRef } from 'react';

import { RPC_URL } from '@/constants';

const SwitchNetworkManager: FC = () => {
  const { adapter } = useAptosWallet();
  const isSwitchingRef = useRef(false);

  const handleNetworkChange = async () => {
    if (isSwitchingRef.current) return;

    isSwitchingRef.current = true;

    try {
      await adapter?.changeNetwork({
        name: Network.CUSTOM,
        chainId: 126, // mainnet Move
        url: RPC_URL[Network.MAINNET],
      });
    } catch (e) {
      console.warn('error: ', e);
    } finally {
      isSwitchingRef.current = false;
    }
  };
  useEffect(() => {
    handleNetworkChange();

    const intervalId = setInterval(() => {
      handleNetworkChange();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [adapter]);

  return null;
};

export default SwitchNetworkManager;
