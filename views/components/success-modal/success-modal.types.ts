import { SwapToken } from '@/views/swap/components/swap.types';

export interface SuccessModalProps {
  transactionTime: string;
}

export interface SuccessModalTokenCardProps {
  to: SwapToken;
  from: SwapToken;
  withoutAmount?: boolean;
}
