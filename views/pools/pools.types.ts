import BigNumber from 'bignumber.js';

import { IPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

import { ISwapSettings } from '../swap/swap.types';
import { FormFilterValue } from './pool-card/pool-card.types';

export enum FilterTypeEnum {
  ALGORITHM = 'algorithm',
  POOL_TYPE = 'pool_type',
  CATEGORY = 'category',
}

export enum PoolTabEnum {
  Pools,
  MyPosition,
}

export interface PoolCardListProps {
  tab: PoolTabEnum;
}

export interface PoolCardListContentProps {
  done: boolean;
  next?: () => void;
  hasMore?: boolean;
  arePoolsLoading: boolean;
  pools?: ReadonlyArray<ReadonlyArray<IPool>>;
}

export interface PoolTokenWithMetadata extends AssetMetadata {
  value: string;
  locked: boolean;
  valueBN: BigNumber;
}

export type PoolToken = PoolTokenWithMetadata;

export interface IPoolForm {
  pool: IPool;
  lpCoin: PoolToken;
  explorerLink: string;
  error: string | null;
  selectedCoinIndex?: number;
  isFindingPool: boolean;
  settings: ISwapSettings;
  isEarnPoolView?: boolean;
  tokenList: ReadonlyArray<PoolToken>;
  filterList: ReadonlyArray<FilterItemProps>;
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  value: FormFilterValue;
}
