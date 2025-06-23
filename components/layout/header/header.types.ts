export enum DeviceMenuType {
  Mobile = 'mobile',
  Desktop = 'desktop',
  Both = 'both',
}

export interface MenuItemsProps {
  name: string;
  path: string;
}

export interface LogoWrapperProps {
  isShort?: boolean;
}
