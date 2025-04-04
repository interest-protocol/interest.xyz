import { AccountAddress } from '@aptos-labs/ts-sdk';
import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import useSWR from 'swr';

import { IPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { getCoinsMetadataFromAPI, parseToMetadata } from '@/utils';

import { useInterestV2Dex } from '../use-interest-dex-v2';
import useSrAmmPoolConfig from '../use-sr-pool-config';

const useV2Pool = (address: string, withMetadata = true) => {
  const dexV2 = useInterestV2Dex();

  const { config } = useSrAmmPoolConfig();

  const {
    data: pool,
    isLoading: loading,
    ...rest
  } = useSWR<IPool>([useV2Pool.name, address, withMetadata], async () => {
    const { metadataX, metadataY, poolAddress, balanceX, balanceY, ...v2Pool } =
      await dexV2.getPool(address);

    const tokensAddresses = [metadataX.toString(), metadataY.toString()];

    const newPool = {
      algorithm: 'v2',
      tokensAddresses,
      curve: 'volatile',
      poolExtraData: v2Pool,
      balances: [balanceX, balanceY],
      poolAddress: poolAddress.toString(),
    } as IPool;

    if (!withMetadata) return newPool;

    const assetsMetadata = await getCoinsMetadataFromAPI([
      normalizeSuiAddress(poolAddress.toString()),
      normalizeSuiAddress(metadataX.toString()),
      normalizeSuiAddress(metadataY.toString()),
    ]);

    newPool.poolMetadata = parseToMetadata(
      assetsMetadata.find(({ type }) =>
        poolAddress.equals(AccountAddress.from(type))
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
