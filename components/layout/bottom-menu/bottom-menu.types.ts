import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface SwapBottomMenuItemProps {
  price: string;
  symbol: string;
  iconUri?: string;
  onClick: () => void;
}

export interface BottomNavListItemProps {
  name: string;
  Icon: FC<SVGProps>;
  isHidden?: boolean;
  onClick?: () => void;
  path?: string | undefined;
}

export interface BottomMenuProps {
  name: string;
  path?: string;
  Icon: FC<SVGProps>;
  isHidden?: boolean;
}
