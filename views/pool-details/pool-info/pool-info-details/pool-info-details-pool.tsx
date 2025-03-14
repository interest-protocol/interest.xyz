import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import useSrAmmPool from '@/hooks/use-sr-amm-pool';

import { PoolDetailAccordionItemStandardProps } from '../components/accordion/accordion.types';
import ItemStandard from '../components/accordion/item-standard';
import { POOL_INFORMATION } from '../pool-info.data';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsPool: FC = () => {
  const { query } = useRouter();
  const { pool, loading } = useSrAmmPool(String(query.address));

  if (!pool || loading) return <PoolInfoLoading />;

  const infoData = [
    (query.address as string) ?? 'N/A',
    'V2(SR-AMM)',
    'Volatile',
  ];

  return (
    <>
      {(
        POOL_INFORMATION.data as Array<PoolDetailAccordionItemStandardProps>
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
