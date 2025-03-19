import BigNumber from 'bignumber.js';

import { ISrPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

import { FilterItemProps } from '../components/farm-filter/farm.types';
import { ISwapSettings } from '../swap/swap.types';

export enum FormFilterValue {
  'official' = 'official',
  'all' = 'all',
  'stable' = 'stable',
  'volatile' = 'volatile',
  'clamm' = 'clamm',
  'amm' = 'amm',
}

export enum FilterTypeEnum {
  ALGORITHM = 'algorithm',
  POOL_TYPE = 'pool_type',
  CATEGORY = 'category',
}

export enum PoolTabEnum {
  Pools,
  MyPosition,
}

export enum PoolOption {
  Deposit,
  Withdraw,
}

export interface PoolCardListProps {
  tab: PoolTabEnum;
}

export interface PoolCardListContentProps {
  done: boolean;
  next?: () => void;
  hasMore?: boolean;
  arePoolsLoading: boolean;
  pools?: ReadonlyArray<ReadonlyArray<ISrPool>>;
}

export interface PoolTokenWithMetadata extends AssetMetadata {
  value: string;
  locked: boolean;
  valueBN: BigNumber;
}

export type PoolToken = PoolTokenWithMetadata;

export interface IPoolForm {
  pool: ISrPool;
  lpCoin: PoolToken;
  explorerLink: string;
  error: string | null;
  tokenSelected?: string;
  isFindingPool: boolean;
  settings: ISwapSettings;
  isEarnPoolView?: boolean;
  tokenList: ReadonlyArray<PoolToken>;
  filterList: ReadonlyArray<FilterItemProps>;
}
