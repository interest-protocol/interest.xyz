import { useAptosWallet } from '@razorlabs/wallet-kit';
import BigNumber from 'bignumber.js';
import { type FC, useEffect, useId } from 'react';
import useSWR from 'swr';

import { parseToMetadata } from '@/utils';

import { useAptosClient } from '../aptos-provider/aptos-client/aptos-client.hooks';
import { useCoins } from './coins-manager.hooks';
import { Asset } from './coins-manager.types';

const CoinsManager: FC = () => {
  const id = useId();
  const client = useAptosClient();
  const { account: currentAccount } = useAptosWallet();

  const { setError, setLoading, setCoins, setMutate } = useCoins();

  useEffect(() => {
    setCoins({});
  }, [currentAccount]);

  const { mutate } = useSWR(
    [id, currentAccount?.address, CoinsManager.name],
    async () => {
      try {
        setError(null);
        setLoading(true);

        if (!currentAccount?.address) return setCoins({});

        const coinsData = await client.getAccountCoinsData({
          accountAddress: currentAccount.address,
        });

        const coins: Record<string, Asset> = coinsData.reduce(
          (acc, { asset_type, amount, metadata }) => {
            if (!asset_type || !metadata) return acc;

            return {
              ...acc,
              [asset_type]: {
                ...parseToMetadata(metadata),
                balance: BigNumber(amount),
              },
            };
          },
          {} as Record<string, Asset>
        );

        setCoins?.(coins);
      } catch (e) {
        console.warn('error: ', e);

        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    },
    {
      refreshInterval: 30000,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshWhenHidden: false,
    }
  );

  useEffect(() => {
    setMutate(mutate);
  }, []);

  return null;
};

export default CoinsManager;
