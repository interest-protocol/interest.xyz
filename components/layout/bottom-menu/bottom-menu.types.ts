export interface SwapBottomMenuItemProps {
  symbol: string;
  iconUri: string;
  usdPrice: string;
  onClick: () => void;
}

export interface SwapBottomMenuListItemProps {
  name: string;
  path: string | undefined;
}
