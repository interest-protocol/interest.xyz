type MenuItem = {
  label: string;
  href: string;
  isExternal?: boolean;
};

export interface IMenuListProps {
  items: (string | MenuItem)[];
}
