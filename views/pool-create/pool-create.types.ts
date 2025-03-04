import BigNumber from 'bignumber.js';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export interface Token extends AssetMetadata {
  value: string;
  valueBN: BigNumber;
  usdPrice: number | null;
}

export enum CreatePoolStep {
  PoolType,
  PoolAlgorithm,
  PoolCoins,
  PoolSummary,
}

export interface CreatePoolForm {
  dex: string;
  error: string;
  isStable: boolean;
  step: CreatePoolStep;
  explorerLink: string;
  type: 'SR-AMM';
  tokens: ReadonlyArray<Token>;
}

export enum CreatePoolMessageEnum {
  atLeastOneCoin = 'You must have at least 0.01 MOVE on your wallet',
  amountSuperior = 'amount is superior than your balance, try to reduce',
  safeBalanceAmount = 'amount is superior than safe balance, try to leave at least 0.1 MOVE',
}

export interface GetByteCodeArgs {
  imageUrl: string;
  description: string;
  coinTypes: string[];
  isStable: boolean;
}

export interface ExtractedCoinData {
  coinType: string;
  coinObjectId: string;
  treasuryCap: null | string;
  coinMetadata: null | string;
}
