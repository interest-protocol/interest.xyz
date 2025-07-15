export interface AdditionalInfoLineProps {
  title: string;
  value: string;
  flag?: string;
}

export interface AdditionalInfoHeaderProps {
  toggle: () => void;
  isOpen: boolean;
  amount: string;
}

export interface SwapManagerEquivalenceProps {
  setAmount: (amount: string) => void;
}
