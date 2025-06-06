import { ReactNode } from 'react';

import { IPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export enum FormFilterValue {
  'official' = 'official',
  'all' = 'all',
  'stable' = 'stable',
  'volatile' = 'volatile',
  'curve' = 'curve',
  'v2' = 'v2',
  'earn' = 'earn',
}

export interface PoolCardHeaderProps {
  tags: ReadonlyArray<string>;
}

export interface PoolCardTokenInfoProps {
  coins: ReadonlyArray<AssetMetadata>;
}

export interface PoolCardTradeProps {
  isInfo?: boolean;
  loading?: boolean;
  amount: ReactNode;
  noBorder?: boolean;
  description: string;
  tooltipInfo: string | ReadonlyArray<PoolCardTradeTooltipItemProps>;
}

export interface PoolCardTradeTooltipItemProps {
  label: string;
  value: ReactNode;
}

export interface PoolCardTradeTooltipListProps {
  tooltipList: ReadonlyArray<PoolCardTradeTooltipItemProps>;
}
export interface PoolCardProps {
  pool: IPool;
}
