export interface AdditionalInfoLineProps {
  title: string;
  value: string;
  flag?: string;
}

export interface AdditionalInfoHeaderProps {
  toggle: () => void;
  isOpen: boolean;
}
