import { Routes, RoutesEnum } from '@/constants';

import { MenuItemsProps } from './header.types';

export const MENU_ITEMS: ReadonlyArray<MenuItemsProps> = [
  {
    name: 'swap',
    path: Routes[RoutesEnum.Swap],
  },
  {
    name: 'Pool',
    path: Routes[RoutesEnum.Pools],
  },
  {
    name: 'Create Token',
    path: Routes[RoutesEnum.TokenCreate],
  },
  {
    name: 'LeaderBoard',
    path: Routes[RoutesEnum.Leaderboard],
  },
  {
    name: 'Bridge',
    path: 'https://bridge.movementnetwork.xyz/',
  },
];
