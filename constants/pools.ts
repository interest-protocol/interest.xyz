import { AccountAddress } from '@aptos-labs/ts-sdk';
import { MAINNET_POOLS } from '@interest-protocol/interest-aptos-curve';
import { values } from 'ramda';

import { IPool } from '@/interface';

export const POOLS: ReadonlyArray<IPool> = values(MAINNET_POOLS).map(
  (pool) => ({
    algorithm: 'curve',
    poolAddress: pool.address.toString(),
    curve: pool.isStable ? 'stable' : 'volatile',
    tokensAddresses: pool.fas.map((fa) => fa.toString()),
  })
);

export const fasByPool = POOLS.map(({ tokensAddresses }) =>
  tokensAddresses.map((tokenAddress) => AccountAddress.from(tokenAddress))
);
