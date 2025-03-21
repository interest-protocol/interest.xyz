import { FormFilterValue } from '../info-card/info-card.types';

export interface FarmFilterProps {
  filterData: ReadonlyArray<FilterDataProps>;
}

export interface FilterDataProps {
  label: string;
  type: FilterTypeEnum;
  data: ReadonlyArray<FilterItemProps>;
}

export enum FilterTypeEnum {
  ALGORITHM = 'algorithm',
  POOL_TYPE = 'pool_type',
  CATEGORY = 'category',
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  value: FormFilterValue;
}
