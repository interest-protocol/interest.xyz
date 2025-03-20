export interface InputProps {
  index: number;
  isMobile?: boolean;
  onRemove?: () => void;
}

export interface HeaderInfoProps {
  type: string;
  decimals: number;
}
