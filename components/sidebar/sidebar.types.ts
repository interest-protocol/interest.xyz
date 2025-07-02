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
