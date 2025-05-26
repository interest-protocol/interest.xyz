import { UseFormReturn } from 'react-hook-form';

import { IPool } from '@/interface';
import { IPoolForm, MetricItemProps } from '@/views/pools/pools.types';

import { PoolFarmsOption } from '../pool-details.types';

export interface TokenListProps {
  type: SelectionFieldValues;
}

export enum SelectionFieldValues {
  None,
  OneCoin,
  Balance,
}

export interface FarmState {
  state: PoolFarmsOption;
}

export interface FarmFormButtonProps
  extends FarmState,
    Pick<IPool, 'poolAddress'> {
  form: UseFormReturn<IPoolForm, any, undefined>;
}

export type MetricPoolDetails = Pick<
  MetricItemProps,
  'tvl' | 'apr' | 'volume1D' | 'farmApr'
>;
