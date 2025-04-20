import { FormFilterValue } from '../pool-card/pool-card.types';
import { FilterItemProps, FilterTypeEnum } from '../pools.types';

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
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.curve,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.v2,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.volatile,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.stable,
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
