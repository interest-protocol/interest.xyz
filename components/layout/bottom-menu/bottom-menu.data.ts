import {
  BridgeSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  MoreSVG,
  PoolSVG,
} from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

import { BottomMenuProps } from './bottom-menu.types';

export const BOTTOM_MENU_ITEMS: ReadonlyArray<BottomMenuProps> = [
  {
    name: 'swap',
    Icon: DoubleChevronSVG,
    path: Routes[RoutesEnum.Swap],
  },
  {
    name: 'Pool',
    Icon: PoolSVG,
    path: Routes[RoutesEnum.Pools],
  },
  {
    Icon: CirclePlusSVG,
    name: 'Create Token',
    path: Routes[RoutesEnum.TokenCreate],
  },
  {
    name: 'Bridge',
    Icon: BridgeSVG,
    path: 'https://bridge.movementnetwork.xyz/',
  },
  {
    name: 'More',
    Icon: MoreSVG,
    isHidden: true,
    path: Routes[RoutesEnum.Swap],
  },
];
