export interface IMenuItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface IMenuSection {
  title: string;
  items: IMenuItem[];
}

export interface IMenuProps {
  onClose: () => void;
}
