import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { useFarms } from '@/hooks/use-farms';
import { FixedPointMath } from '@/lib';
import { formatAddress, formatMoney } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import PoolInfoLoading from '../../pool-info-loading';
import {
  ContentDataProps,
  PoolDetailAccordionItemStandardProps,
} from '../components/accordion/accordion.types';
import ItemStandard from '../components/accordion/item-standard';
import { FARM_INFORMATION } from '../pool-info.data';

const FarmInfoDetailsPool: FC = () => {
  const { getValues } = useFormContext<IPoolForm>();
  const { data: farms, isLoading } = useFarms([getValues('pool.poolAddress')]);

  if (!farms || isLoading) return <PoolInfoLoading />;

  console.log(farms, '>>>farms');
  const infoData: ReadonlyArray<ContentDataProps> = [
    {
      value: formatAddress(farms[0].address as string) ?? 'N/A',
      copyClipboard: farms[0].address as string,
    },
    {
      value: formatMoney(
        FixedPointMath.toNumber(BigNumber(String(farms[0].stakedBalance)), 9),
        4
      ),
    },
    { value: `${getValues('apr')}%` || '' },
  ];

  return (
    <>
      {(
        FARM_INFORMATION.data as Array<PoolDetailAccordionItemStandardProps>
      ).map(({ label, popupInfo, isCopyClipBoard }, index) => (
        <ItemStandard
          key={v4()}
          label={label}
          loading={isLoading}
          popupInfo={popupInfo}
          content={infoData[index]}
          isCopyClipBoard={isCopyClipBoard}
        />
      ))}
    </>
  );
};

export default FarmInfoDetailsPool;
