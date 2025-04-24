import { VolatilePool } from '@interest-protocol/interest-aptos-curve';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';

import { usePoolDetails } from '../../pool-details.context';
import { PoolDetailAccordionItemStandardProps } from '../components/accordion/accordion.types';
import ItemStandard from '../components/accordion/item-standard';
import { POOL_CURVE_VOLATILE_INFO, POOL_INFORMATION } from '../pool-info.data';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsPool: FC = () => {
  const { query } = useRouter();
  const { pool, loading } = usePoolDetails();
  console.log(pool, '>>>pools');
  if (!pool || loading) return <PoolInfoLoading />;

  const poolExtraDataVolatile = pool.poolExtraData as unknown as VolatilePool;

  const showAdditionalInfo =
    pool.curve == 'volatile' && pool.algorithm == 'curve';

  const infoData = [
    (query.address as string) ?? 'N/A',
    pool.algorithm.toUpperCase(),
    pool.curve,
    ...(showAdditionalInfo
      ? [
          formatMoney(+(+poolExtraDataVolatile.a).toFixed(8)),
          FixedPointMath.toNumber(
            BigNumber(poolExtraDataVolatile.gamma),
            18
          ).toFixed(8),
        ]
      : []),
  ];

  return (
    <>
      {(
        [
          ...POOL_INFORMATION.data,
          ...(showAdditionalInfo ? POOL_CURVE_VOLATILE_INFO : []),
        ] as Array<PoolDetailAccordionItemStandardProps>
      ).map(({ label, popupInfo, isCopyClipBoard }, index) => (
        <ItemStandard
          key={v4()}
          label={label}
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
