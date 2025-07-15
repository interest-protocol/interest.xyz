import { FC, ReactNode } from 'react';

import { SVGProps } from '@/components/svg';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export interface UserInfoProps {
  handleSettings: () => void;
}

export interface SettingMenuProps {
  handleToggleProfile: () => void;
  handleCurrency: () => void;
}

export interface MenuCurrencyProps {
  handleBack: () => void;
}

export enum ProfileTabsMenuEnum {
  coin,
}

export interface ProfileTabItemProps {
  name: string;
  value: ProfileTabsMenuEnum;
}

export interface CoinCardProps {
  token: AssetMetadata;
}

export interface CardWrapperProps {
  symbol: string;
  TokenIcon: ReactNode;
  supportingText: string;
}
export interface AvatarProps {
  accountAddress?: string;
}

export interface BottomButtonProps {
  title: string;
  Icon: FC<SVGProps>;
  onClick: () => void;
  hasChevron?: boolean;
}
