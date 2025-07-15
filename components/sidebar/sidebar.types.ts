import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface ISidebarItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ISidebarSection {
  title: string;
  items: ISidebarItem[];
}

export interface ISidebarProps {
  onClose: () => void;
}

export type ISocialLinkProps = {
  pathname: string;
  title: string;
  Icon: FC<SVGProps>;
};
