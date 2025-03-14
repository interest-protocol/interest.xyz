import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import useSrAmmPool from '@/hooks/use-sr-amm-pool';
import { FixedPointMath } from '@/lib';

import { PoolDetailAccordionItemStandardProps } from '../components/accordion/accordion.types';
import ItemStandard from '../components/accordion/item-standard';
import { POOL_STATISTICS } from '../pool-info.data';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsStats: FC = () => {
  const { query } = useRouter();
  const { pool, config, loading } = useSrAmmPool(String(query.address));

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
