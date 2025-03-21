import { FilterItemProps, FilterTypeEnum } from '../farm.types';

export interface DropdownProps {
  label?: string;
  isPool?: boolean;
  disabled?: boolean;
  type: FilterTypeEnum;
  filterData: ReadonlyArray<FilterItemProps>;
}
