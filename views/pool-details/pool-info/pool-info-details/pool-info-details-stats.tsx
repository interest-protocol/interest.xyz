import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';

import { usePoolDetails } from '../../pool-details.context';
import Accordion from '../components/accordion';
import { PoolDetailAccordionItemStandardProps } from '../components/accordion/accordion.types';
import ItemStandard from '../components/accordion/item-standard';
import { POOL_STATISTICS } from '../pool-info.data';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsStats: FC = () => {
  const { pool, config, loading } = usePoolDetails();

  if (!pool || loading)
    return (
      <Accordion title={POOL_STATISTICS.title} noBorder>
        <PoolInfoLoading />
      </Accordion>
    );

  if (pool.algorithm == 'curve') return;

  const statsData = [
    'N/A',
    config
      ? `${FixedPointMath.toNumber(BigNumber(String(config?.fee)), 9) * 100}%`
      : 'N/A',
  ];

  return (
    <Accordion title={POOL_STATISTICS.title} noBorder>
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
    </Accordion>
  );
};

export default PoolInfoDetailsStats;
