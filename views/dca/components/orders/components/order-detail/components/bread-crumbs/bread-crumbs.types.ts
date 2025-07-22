export type BreadcrumbItem = {
  label: string;
  href: string;
};

export interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
}
