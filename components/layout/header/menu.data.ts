import { Routes, RoutesEnum } from '@/constants';

import { MenuItemsProps } from './header.types';

export const MENU_ITEMS: ReadonlyArray<MenuItemsProps> = [
  {
    name: 'swap',
    path: Routes[RoutesEnum.Swap],
  },
  {
    name: 'Create Token',
    path: Routes[RoutesEnum.TokenCreate],
  },
];
