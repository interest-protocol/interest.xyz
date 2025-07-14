import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { ISwapSettings } from '../../swap.types';

export interface InputWrapperProps {
  title: string;
  register: UseFormRegister<ISwapSettings>;
  Input?: ReactNode;
  altInfo?: string;
  name:
    | 'slippage'
    | 'slippageTolerance'
    | 'transactionDeadline'
    | 'infiniteApproval';
}
