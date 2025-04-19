import { AccountAddress } from '@aptos-labs/ts-sdk';
import {
  InterestV2Pool,
  normalizeSuiAddress,
} from '@interest-protocol/interest-aptos-v2';
import useSWR from 'swr';

import { IPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { getCoinsMetadataFromAPI, parseToMetadata } from '@/utils';

import useSrAmmPoolConfig from '../use-sr-pool-config';

interface InterestV2PoolAPI
  extends Omit<
    InterestV2Pool,
    'poolAddress' | 'metadataX' | 'metadataY' | 'balanceX' | 'balanceY'
  > {
  metadataX: string;
  metadataY: string;
  poolAddress: string;
  balanceX: string;
  balanceY: string;
}

const useV2Pool = (address: string, withMetadata = true) => {
  const { config } = useSrAmmPoolConfig();

  const {
    data: pool,
    isLoading: loading,
    ...rest
  } = useSWR<IPool>([useV2Pool.name, address, withMetadata], async () => {
    const {
      metadataX,
      metadataY,
      poolAddress,
      balanceX,
      balanceY,
      ...v2Pool
    }: InterestV2PoolAPI = await fetch(`/api/v1/dex/v2/pool/${address}`).then(
      (res) => res.json()
    );

    const tokensAddresses = [metadataX, metadataY];

    const newPool = {
      poolAddress,
      algorithm: 'v2',
      tokensAddresses,
      curve: 'volatile',
      poolExtraData: v2Pool,
      balances: [balanceX, balanceY],
    } as IPool;

    if (!withMetadata) return newPool;

    const assetsMetadata = await getCoinsMetadataFromAPI([
      normalizeSuiAddress(AccountAddress.from(poolAddress).toString()),
      normalizeSuiAddress(AccountAddress.from(metadataX).toString()),
      normalizeSuiAddress(AccountAddress.from(metadataY).toString()),
    ]);

    newPool.poolMetadata = parseToMetadata(
      assetsMetadata.find(({ type }) =>
        AccountAddress.from(poolAddress).equals(AccountAddress.from(type))
      )!
    );

    newPool.tokensMetadata = assetsMetadata.reduce((acc, metadata) => {
      const isValidMetadata = tokensAddresses.some((address) =>
        AccountAddress.from(address).equals(AccountAddress.from(metadata.type))
      );

      if (!isValidMetadata) return acc;

      return [...acc, parseToMetadata(metadata)];
    }, [] as ReadonlyArray<AssetMetadata>);

    return newPool;
  });

  return { loading, config, pool, ...rest };
};

export default useV2Pool;
