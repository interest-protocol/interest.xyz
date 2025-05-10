import { BridgeSVG } from '@/components/svg';

import { MenuItemProps } from '../layout/sidebar/sidebar.types';

export const MENU_MOBILE_ITEMS: ReadonlyArray<
  Omit<
    MenuItemProps,
    'setIsCollapsed' | 'isCollapsed' | 'setTemporarilyOpen' | 'temporarilyOpen'
  >
> = [
  {
    Icon: BridgeSVG,
    name: 'Bridge',
    path: 'https://bridge.movementnetwork.xyz/',
    disabled: false,
  },
];
