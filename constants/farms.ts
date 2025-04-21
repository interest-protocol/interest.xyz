import { FARMS } from '@interest-protocol/interest-aptos-curve';

export const FARMS_BY_LP = FARMS.reduce(
  (acc, farm) => ({ ...acc, [farm.stakeFa]: farm }),
  {} as Record<string, (typeof FARMS)[0]>
);
