import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';

import { usePoolDetails } from '../../pool-details.context';
import { PoolDetailAccordionItemStandardProps } from '../components/accordion/accordion.types';
import ItemStandard from '../components/accordion/item-standard';
import { POOL_STATISTICS } from '../pool-info.data';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsStats: FC = () => {
  const { pool, config, loading } = usePoolDetails();

  if (!pool || loading) return <PoolInfoLoading />;

  const statsData = [
    pool
      ? FixedPointMath.toNumber(
          BigNumber(String(pool.bidLiquidity ?? 0)),
          pool.metadata.decimals
        )
      : 'N/A',
    config
      ? `${FixedPointMath.toNumber(BigNumber(String(config?.fee)), 9) * 100}%`
      : 'N/A',
  ];

  return (
    <>
      {(
        POOL_STATISTICS.data as Array<PoolDetailAccordionItemStandardProps>
      ).map(({ label, popupInfo, isCopyClipBoard }, index) => (
        <ItemStandard
          key={v4()}
          label={label}
          loading={loading}
          popupInfo={popupInfo}
          content={statsData[index]}
          isCopyClipBoard={isCopyClipBoard}
        />
      ))}
    </>
  );
};

export default PoolInfoDetailsStats;
