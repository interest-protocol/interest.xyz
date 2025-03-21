import { ReactNode } from 'react';

import { ISrPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export enum FormFilterValue {
  'official' = 'official',
  'all' = 'all',
  'stable' = 'stable',
  'volatile' = 'volatile',
  'clamm' = 'clamm',
  'amm' = 'amm',
  'farm' = 'farm',
}

export interface InfoCardHeaderProps {
  tags?: ReadonlyArray<string>;
}

export interface InfoCardTokenCoinsProps {
  coins: ReadonlyArray<AssetMetadata>;
}

export interface InfoCardTradeProps {
  isInfo?: boolean;
  loading?: boolean;
  amount: ReactNode;
  noBorder?: boolean;
  description: string;
  tooltipInfo: string;
}

export interface InfoCardProps {
  pool: ISrPool;
}

export interface InfoCardSkeletonProps {
  isPool?: boolean;
}
