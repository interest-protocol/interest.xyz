import {
  CirclePlusSVG,
  DoubleChevronSVG,
  PoolSVG,
  WalletMenuSVG,
} from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

import { BottomMenuProps } from './bottom-menu.types';

export const BOTTOM_MENU_ITEMS: ReadonlyArray<BottomMenuProps> = [
  {
    Icon: DoubleChevronSVG,
    name: 'swap',
    path: Routes[RoutesEnum.Swap],
  },
  {
    Icon: PoolSVG,
    name: 'Pool',
    path: Routes[RoutesEnum.Pools],
  },
  {
    Icon: CirclePlusSVG,
    name: 'Create Token',
    path: Routes[RoutesEnum.TokenCreate],
  },
  {
    Icon: WalletMenuSVG,
    name: 'Connect',
    path: Routes[RoutesEnum.TokenCreate],
  },
];
