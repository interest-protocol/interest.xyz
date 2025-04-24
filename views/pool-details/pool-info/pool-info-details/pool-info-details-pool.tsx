import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ICurvePoolData } from '@/interface';
import { FixedPointMath } from '@/lib';

import { usePoolDetails } from '../../pool-details.context';
import { PoolDetailAccordionItemStandardProps } from '../components/accordion/accordion.types';
import ItemStandard from '../components/accordion/item-standard';
import { POOL_INFORMATION, POOL_VOLATILE_INFO } from '../pool-info.data';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsPool: FC = () => {
  const { query } = useRouter();
  const { pool, loading } = usePoolDetails();
  console.log(pool, '>>>pools');
  if (!pool || loading) return <PoolInfoLoading />;

  const isVolatile = pool.curve == 'volatile';

  const infoData = [
    (query.address as string) ?? 'N/A',
    pool.algorithm.toUpperCase(),
    pool.curve,
    ...(isVolatile
      ? [
          (pool.poolExtraData as ICurvePoolData).a,
          FixedPointMath.toNumber(
            BigNumber((pool.poolExtraData as ICurvePoolData).gamma),
            18
          ),
        ]
      : []),
  ];

  return (
    <>
      {(
        [
          ...POOL_INFORMATION.data,
          ...(isVolatile ? POOL_VOLATILE_INFO : []),
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
