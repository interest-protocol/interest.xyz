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
  type: PoolTabEnum;
  arePoolsLoading: boolean;
  pools?: ReadonlyArray<ReadonlyArray<IPool>>;
}

export interface PoolTokenWithMetadata extends AssetMetadata {
  value: string;
  locked: boolean;
  valueBN: BigNumber;
}

export type PoolToken = PoolTokenWithMetadata;

export interface Metric {
  coins: ReadonlyArray<string>;
  poolId: string;
  balances: ReadonlyArray<string>;
  symbols: ReadonlyArray<string>;
  adminFee: number;
  isStable: boolean;
  metrics: MetricItemProps;
}

export interface PositionAmountProps {
  wallet: number;
  farm: number;
}
export interface MetricItemProps {
  tvl: string;
  tvl1D: string;
  tvl7D: string;
  tvl30D: string;
  apr: string;
  farmApr: string;
  fees: string;
  fees1D: string;
  fees7D: string;
  fees30D: string;
  volume: string;
  volume1D: string;
  volume7D: string;
  volume30D: string;
  revenue: string;
  revenue1D: string;
  revenue7D: string;
  revenue30D: string;
}

export interface IPoolForm {
  pool: IPool;
  lpCoin: PoolToken;
  explorerLink: string;
  error: string | null;
  selectedCoinIndex: ReadonlyArray<boolean>;
  isFindingPool: boolean;
  settings: ISwapSettings;
  search?: string;
  apr?: string;
  syncBalances?: boolean;
  metrics?: ReadonlyArray<Metric>;
  position?: PositionAmountProps;
  tokenList: ReadonlyArray<PoolToken>;
  ratio: ReadonlyArray<number>;
  positionList: Record<string, number>;
  filterList: ReadonlyArray<FilterItemProps>;
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  value: FormFilterValue;
}
