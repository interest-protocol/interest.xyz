import { UseFormReturn } from 'react-hook-form';

import { IPool } from '@/interface';
import { IPoolForm } from '@/views/pools/pools.types';

export interface RadioFieldProps {
  label: string;
  type: SelectionFieldValues;
  currentValue: SelectionFieldValues;
  handleSelect: (newValue: SelectionFieldValues) => void;
}

export interface TokenListProps {
  type: SelectionFieldValues;
}

export enum SelectionFieldValues {
  None,
  OneCoin,
  Balance,
}

export interface PoolFormButtonProps
  extends Pick<IPool, 'algorithm' | 'poolAddress'> {
  form: UseFormReturn<IPoolForm, any, undefined>;
}

export interface PoolFormActiveProps {
  isDepositForm?: boolean;
}
