import {
  BridgeSVG,
  CirclePlusSVG,
  DoubleChevronSVG,
  PoolSVG,
} from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

import { MenuItemProps } from './sidebar.types';

export const SIDEBAR_ITEMS: ReadonlyArray<
  Omit<
    MenuItemProps,
    'setIsCollapsed' | 'isCollapsed' | 'setTemporarilyOpen' | 'temporarilyOpen'
  >
> = [
  {
    Icon: DoubleChevronSVG,
    name: 'swap',
    path: Routes[RoutesEnum.Swap],
    disabled: false,
  },
  {
    Icon: PoolSVG,
    name: 'Pool',
    path: Routes[RoutesEnum.Pools],
    disabled: false,
  },
  {
    Icon: CirclePlusSVG,
    name: 'Create Token',
    path: Routes[RoutesEnum.TokenCreate],
    disabled: false,
  },
  {
    Icon: BridgeSVG,
    name: 'Bridge',
    path: 'https://bridge.movementnetwork.xyz/',
    disabled: false,
  },
];
