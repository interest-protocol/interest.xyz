import BigNumber from 'bignumber.js';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export interface Token extends AssetMetadata {
  value: string;
  valueBN: BigNumber;
}

export enum CreatePoolStep {
  PoolAlgorithm,
  PoolCurve,
  PoolCoins,
  PoolSummary,
}

export interface CreatePoolForm {
  dex: string;
  error: string;
  algorithm: string;
  step: CreatePoolStep;
  explorerLink: string;
  tokens: ReadonlyArray<Token>;
  curve: 'stable' | 'volatile';
}

export enum CreatePoolMessageEnum {
  atLeastOneCoin = 'You must have at least 0.01 MOVE on your wallet',
  amountSuperior = 'amount is superior than your balance, try to reduce',
  safeBalanceAmount = 'amount is superior than safe balance, try to leave at least 0.1 MOVE',
}
