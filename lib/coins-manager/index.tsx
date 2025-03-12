import { GetFungibleAssetMetadataResponse } from '@aptos-labs/ts-sdk';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import BigNumber from 'bignumber.js';
import { type FC, useEffect, useId } from 'react';
import useSWR from 'swr';

import { isAptos } from '@/utils';

import { useAptosClient } from '../aptos-provider/aptos-client/aptos-client.hooks';
import { useCoins } from './coins-manager.hooks';
import { Asset, TokenStandard } from './coins-manager.types';

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

        const coinsMetadata: Record<
          string,
          GetFungibleAssetMetadataResponse[0]
        > = {};

        for (const item of coinsData) {
          const metadata = await client.getFungibleAssetMetadataByAssetType({
            assetType: item.asset_type!,
          });

          coinsMetadata[item.asset_type!] = metadata;
        }

        const coins: Record<string, Asset> = coinsData.reduce(
          (acc, { asset_type, amount }) => {
            if (!asset_type || !coinsMetadata[asset_type]) return acc;

            const {
              name,
              symbol,
              decimals,
              token_standard,
              icon_uri: iconUri,
              project_uri: projectUri,
            } = coinsMetadata[asset_type];

            if (isAptos(asset_type)) {
              const symbol = 'MOVE';

              const type =
                token_standard === TokenStandard.COIN
                  ? '0x1::aptos_coin::AptosCoin'
                  : '0xa';

              return {
                ...acc,
                [type]: {
                  type,
                  name,
                  symbol,
                  decimals,
                  balance: BigNumber(amount.toString()),
                  standard:
                    token_standard === TokenStandard.COIN
                      ? TokenStandard.COIN
                      : TokenStandard.FA,
                  ...(!!projectUri && { projectUri }),
                  ...(!!iconUri && { iconUri: iconUri }),
                },
              };
            }

            return {
              ...acc,
              [asset_type]: {
                name,
                decimals,
                type: asset_type,
                balance: BigNumber(amount.toString()),
                symbol: symbol,
                standard:
                  token_standard === 'v1'
                    ? TokenStandard.COIN
                    : TokenStandard.FA,
                ...(!!projectUri && { projectUri }),
                ...(!!iconUri && { iconUri: iconUri }),
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
