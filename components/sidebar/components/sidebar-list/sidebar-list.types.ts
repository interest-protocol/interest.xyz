interface SidebarItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ISidebarListProps {
  items: (string | SidebarItem)[];
}
