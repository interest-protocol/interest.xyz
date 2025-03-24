import { ReactNode } from 'react';

import { IPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export enum FormFilterValue {
  'official' = 'official',
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
  isInfo?: boolean;
  loading?: boolean;
  amount: ReactNode;
  noBorder?: boolean;
  description: string;
  tooltipInfo: string;
}

export interface PoolCardProps {
  pool: IPool;
}
