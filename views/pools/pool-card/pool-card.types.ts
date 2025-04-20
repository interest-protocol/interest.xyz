import { ReactNode } from 'react';

import { ISrPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export enum FormFilterValue {
  'official' = 'official',
  'v2' = 'v2',
  'curve' = 'curve',
  'all' = 'all',
  'stable' = 'stable',
  'volatile' = 'volatile',
  'clamm' = 'clamm',
  'amm' = 'amm',
}

export interface PoolCardHeaderProps {
  tags?: ReadonlyArray<string>;
}

export interface PoolCardTokenInfoProps {
  coins: ReadonlyArray<AssetMetadata>;
}

export interface PoolCardTradeProps {
  index: number;
  isInfo?: boolean;
  amount: ReactNode;
  description: string;
  tooltipInfo: string;
}

export interface PoolCardProps {
  pool: ISrPool;
}
