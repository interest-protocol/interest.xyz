import { FormFilterValue } from '@/views/components/info-card/info-card.types';

import { FilterTypeEnum } from './farm.types';

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
  {
    label: 'Category',
    data: CATEGORY,
    type: FilterTypeEnum.CATEGORY,
  },
];
