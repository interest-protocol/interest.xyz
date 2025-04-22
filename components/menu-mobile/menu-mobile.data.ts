import { BridgeSVG, PodiumSVG } from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

import { MenuItemProps } from '../layout/sidebar/sidebar.types';

export const MENU_MOBILE_ITEMS: ReadonlyArray<
  Omit<
    MenuItemProps,
    'setIsCollapsed' | 'isCollapsed' | 'setTemporarilyOpen' | 'temporarilyOpen'
  >
> = [
  {
    Icon: PodiumSVG,
    name: 'LeaderBoard',
    path: Routes[RoutesEnum.Leaderboard],
    disabled: false,
  },
  {
    Icon: BridgeSVG,
    name: 'Bridge',
    path: 'https://bridge.movementnetwork.xyz/',
    disabled: false,
  },
];
