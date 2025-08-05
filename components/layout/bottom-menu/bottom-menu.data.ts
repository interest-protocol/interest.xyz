import { CirclePlusSVG, DoubleChevronSVG } from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

import { BottomMenuProps } from './bottom-menu.types';

export const BOTTOM_MENU_ITEMS: ReadonlyArray<BottomMenuProps> = [
  {
    name: 'swap',
    Icon: DoubleChevronSVG,
    path: Routes[RoutesEnum.Swap],
  },
  {
    Icon: CirclePlusSVG,
    name: 'Create Token',
    path: Routes[RoutesEnum.TokenCreate],
  },
];
