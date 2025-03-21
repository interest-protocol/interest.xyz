import { FilterItemProps } from '../farm.types';

export interface FilterSelectedItemProps {
  selectedItem: FilterItemProps;
  onClick: (item: FilterItemProps) => void;
}
