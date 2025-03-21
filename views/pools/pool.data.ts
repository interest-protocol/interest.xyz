import { POOLS } from '@/constants/pools';
import { PoolTypeEnum, SrAmmPool } from '@/interface';

import {
  FilterItemProps,
  FilterTypeEnum,
} from '../components/farm-filter/farm.types';
import { FormFilterValue } from '../components/info-card/info-card.types';

export const POOL_DATA: ReadonlyArray<SrAmmPool> = POOLS.map(
  ({ address, faX, faY }) => ({
    isVolatile: true,
    poolType: PoolTypeEnum.srAMM,
    poolAddress: address.toString(),
    coins: {
      typeX: faX.toString(),
      typeY: faY.toString(),
    },
  })
);

export const LINES = [
  {
    description: 'Fee',
    tooltipInfo: 'Trade fee in percentage',
  },
  {
    description: 'Bid Liquidity',
    tooltipInfo: 'Liquidity',
  },
];
export const ALGORITHM_TYPE: Array<FilterItemProps> = [
  {
    type: FilterTypeEnum.ALGORITHM,
    value: FormFilterValue.stable,
  },
  {
    type: FilterTypeEnum.ALGORITHM,
    value: FormFilterValue.volatile,
  },
];

export const CATEGORY = [
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.official,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.all,
  },
];

export const FILTERS_DATA = [
  // {
  //   label: 'Algorithm',
  //   data: ALGORITHM_TYPE,
  //   type: FilterTypeEnum.ALGORITHM,
  // },
  {
    label: 'Category',
    data: CATEGORY,
    type: FilterTypeEnum.CATEGORY,
  },
];
