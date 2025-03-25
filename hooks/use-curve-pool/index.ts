import { AccountAddress } from '@aptos-labs/ts-sdk';
import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import { values } from 'ramda';
import useSWR from 'swr';

import { IPool } from '@/interface';
import { getCoinsMetadataFromAPI, parseToMetadata } from '@/utils';

import { useInterestCurveDex } from '../use-interest-dex-curve';

const useCurvePool = (address: string, withMetadata = true) => {
  const dexCurve = useInterestCurveDex();

  const {
    data: pool,
    isLoading: loading,
    ...rest
  } = useSWR<IPool>([useCurvePool.name, address, withMetadata], async () => {
    const {
      fas,
      isStable,
      address: poolAddress,
      data: { balances, ...otherData },
      ...curvePool
    } = await dexCurve.getPool(address);

    const tokensAddresses = fas.map((tokenAddress) => tokenAddress.toString());

    const newPool = {
      balances,
      poolAddress,
      tokensAddresses,
      algorithm: 'curve',
      curve: isStable ? 'stable' : 'volatile',
      poolExtraData: { ...otherData, ...curvePool },
    };

    if (!withMetadata) return newPool as IPool;

    const metadataAddresses = {
      poolMetadata: normalizeSuiAddress(poolAddress.toString()),
      tokensMetadata: fas.map((fa) => normalizeSuiAddress(fa.toString())),
    };

    const assetsMetadata = await getCoinsMetadataFromAPI(
      values(metadataAddresses).flat()
    );

    const metadata = assetsMetadata.map((apiMetadata) =>
      parseToMetadata(apiMetadata)
    );

    return {
      ...newPool,
      poolMetadata: metadata.find(({ type }) =>
        AccountAddress.from(poolAddress).equals(AccountAddress.from(type))
      ),
      tokensMetadata: fas.map((address) =>
        metadata.find(({ type }) =>
          AccountAddress.from(address).equals(AccountAddress.from(type))
        )
      ),
    } as IPool;
  });

  return { loading, pool, ...rest };
};

export default useCurvePool;
