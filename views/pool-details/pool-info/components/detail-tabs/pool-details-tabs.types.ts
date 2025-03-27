import { ReactNode } from 'react';

export interface DetailsTabItemProps {
  item: ReactNode;
  isSelected: boolean;
  onChange: () => void;
}

export interface DetaiTabsProps {
  defaultTabIndex?: number;
  items: ReadonlyArray<ReactNode>;
  onChangeTab?: (tabIndex: number) => void;
}
