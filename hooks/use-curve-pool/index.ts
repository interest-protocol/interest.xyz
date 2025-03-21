import { AccountAddress } from '@aptos-labs/ts-sdk';
import { InterestCurvePool } from '@interest-protocol/interest-aptos-curve';
import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import { values } from 'ramda';
import useSWR from 'swr';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { getCoinsMetadataFromAPI, parseToMetadata } from '@/utils';

import { useInterestCurveDex } from '../use-interest-dex-curve';

interface CurvePool extends InterestCurvePool {
  poolMetadata?: AssetMetadata;
  tokensMetadata?: ReadonlyArray<AssetMetadata>;
}

const useCurvePool = (address: string, withMetadata = true) => {
  const dexCurve = useInterestCurveDex();

  const {
    data: pool,
    isLoading: loading,
    ...rest
  } = useSWR<CurvePool>(
    [useCurvePool.name, address, withMetadata],
    async () => {
      const curvePool = await dexCurve.getPool(address);

      console.log({ curvePool });

      if (!withMetadata) return curvePool as CurvePool;

      const metadataAddresses = {
        poolMetadata: normalizeSuiAddress(curvePool.address.toString()),
        tokensMetadata: curvePool.fas.map((fa) =>
          normalizeSuiAddress(fa.toString())
        ),
      };

      const assetsMetadata = await getCoinsMetadataFromAPI(
        values(metadataAddresses).flat()
      );

      const metadata = assetsMetadata.map((apiMetadata) =>
        parseToMetadata(apiMetadata)
      );

      return {
        ...curvePool,
        poolMetadata: metadata.find(({ type }) =>
          AccountAddress.from(curvePool.address).equals(
            AccountAddress.from(type)
          )
        ),
        tokensMetadata: curvePool.fas.map((address) =>
          metadata.find(({ type }) =>
            AccountAddress.from(address).equals(AccountAddress.from(type))
          )
        ),
      } as CurvePool;
    }
  );

  return { loading, pool, ...rest };
};

export default useCurvePool;
