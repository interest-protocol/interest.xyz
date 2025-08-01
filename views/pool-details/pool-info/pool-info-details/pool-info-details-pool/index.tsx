import {
  StablePool,
  VolatilePool,
} from '@interest-protocol/interest-aptos-curve';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { formatAddress, formatDollars, formatMoney } from '@/utils';

import { usePoolDetails } from '../../../pool-details.context';
import {
  ContentDataProps,
  PoolDetailAccordionItemStandardProps,
} from '../../components/accordion/accordion.types';
import ItemStandard from '../../components/accordion/item-standard';
import {
  POOL_CURVE_STABLE_INFO,
  POOL_CURVE_VOLATILE_INFO,
  POOL_INFORMATION,
} from '../../pool-info.data';
import PoolInfoLoading from '../../pool-info-loading';

const PoolInfoDetailsPool: FC = () => {
  const { query } = useRouter();
  const { pool, loading } = usePoolDetails();

  if (!pool || loading) return <PoolInfoLoading />;

  const isVolatile = pool.curve == 'volatile';
  const isV2 = pool.algorithm == 'v2';

  const getVolatileData = (): ReadonlyArray<ContentDataProps> => {
    const poolExtraData = pool.poolExtraData as unknown as VolatilePool;
    const priceRaw = poolExtraData?.prices[pool.tokensAddresses[1]];
    const price = priceRaw?.price
      ? `${formatMoney(FixedPointMath.toNumber(BigNumber(String(priceRaw?.price)), 18), 6)} ${pool.tokensMetadata?.[0]?.symbol}`
      : '0';
    const lastPrice = priceRaw?.lastPrice
      ? `${formatMoney(FixedPointMath.toNumber(BigNumber(String(priceRaw.lastPrice)), 18), 6)} ${pool.tokensMetadata?.[0]?.symbol}`
      : '0';
    return [
      { value: FixedPointMath.toNumber(BigNumber(poolExtraData?.a || '0'), 0) },
      {
        value: `${
          (FixedPointMath.toNumber(BigNumber(poolExtraData?.gamma || '0'), 0) /
            1e18) *
          100
        } %`,
      },
      { value: price },
      { value: lastPrice },
      {
        value: formatDollars(
          FixedPointMath.toNumber(
            BigNumber(String(poolExtraData?.virtualPrice || 0)),
            18
          ),
          4
        ),
      },
      {
        value: `${formatMoney(
          FixedPointMath.toNumber(BigNumber(String(poolExtraData.fees.midFee)))
        )}% - ${formatMoney(
          FixedPointMath.toNumber(BigNumber(String(poolExtraData.fees.outFee)))
        )}%`,
      },
    ];
  };

  const getStableData = (): ReadonlyArray<ContentDataProps> => {
    const poolExtraData = pool.poolExtraData as unknown as StablePool;
    return [
      {
        value: FixedPointMath.toNumber(
          BigNumber(String(poolExtraData.initialA)),
          0
        ),
      },
    ];
  };

  const infoData: ReadonlyArray<ContentDataProps> = [
    {
      value: formatAddress(query.address as string) ?? 'N/A',
      copyClipboard: query.address as string,
    },
    { value: pool.algorithm.toUpperCase() },
    { value: pool.curve },
    ...(pool.algorithm === 'curve'
      ? isVolatile
        ? getVolatileData()
        : getStableData()
      : []),
  ];

  return (
    <>
      {(
        [
          ...POOL_INFORMATION.data,
          ...(!isV2
            ? isVolatile
              ? POOL_CURVE_VOLATILE_INFO
              : POOL_CURVE_STABLE_INFO
            : []),
        ] as Array<PoolDetailAccordionItemStandardProps>
      ).map(({ label, popupInfo, isCopyClipBoard }, index) => (
        <ItemStandard
          key={v4()}
          label={
            label == 'Price' || label == 'Last Price'
              ? `${pool.tokensMetadata?.[1]?.symbol} ${label}`
              : label
          }
          loading={loading}
          popupInfo={popupInfo}
          content={infoData[index]}
          isCopyClipBoard={isCopyClipBoard}
        />
      ))}
    </>
  );
};

export default PoolInfoDetailsPool;
