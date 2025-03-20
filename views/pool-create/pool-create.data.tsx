import { ReactNode } from 'react';
import { v4 } from 'uuid';

import PoolSummary from './pool-summary';
import SelectAlgorithm from './select-algorithm';
import SelectCoins from './select-coins';
import SelectCurve from './select-curve';

export const poolAlgorithms: Record<string, string> = {
  'sr-amm': 'V2(SR-AMM)',
  clamm: 'CLAMM',
};

export const stepTitle: ReadonlyArray<ReactNode> = [
  `Select algorithm`,
  `Select curve`,
  `Select your coin and \ninitial Deposit`,
  `Select your coin and \ninitial Deposit`,
];

export const stepContent: ReadonlyArray<ReactNode> = [
  <SelectAlgorithm key={v4()} />,
  <SelectCurve key={v4()} />,
  <SelectCoins key={v4()} />,
  <PoolSummary key={v4()} />,
];
