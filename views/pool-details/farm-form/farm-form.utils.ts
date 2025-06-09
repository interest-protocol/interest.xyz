import { Network } from '@interest-protocol/interest-aptos-v2';

import { Quest } from '@/server/model/quest';
import { PoolToken } from '@/views/pools/pools.types';

export const logDepositPool = (
  poolId: string,
  address: string,
  tokenA: PoolToken,
  tokenB: PoolToken,
  network: Network,
  txDigest: string
) =>
  fetch(`https://api.staging.interestlabs.io/v1/quest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      name: `Add ${tokenA.symbol}-${tokenA.symbol} Liquidity`,
      summary: `Add ${tokenA.symbol}-${tokenA.symbol} Liquidity`,
      value: {
        quest: {
          address,
          txDigest,
          kind: 'addLiquidity',
          data: {
            poolId,
            coinA: {
              type: tokenA.type,
              amount: tokenA.value,
              symbol: tokenA.symbol,
            },
            coinB: {
              type: tokenB.type,
              amount: tokenB.value,
              symbol: tokenB.symbol,
            },
          },
        },
        profileField: 'addLiquidity',
        network,
      },
    } as Omit<Quest, 'timestamp'>),
  });
