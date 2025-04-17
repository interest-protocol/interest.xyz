import { Network } from '@interest-protocol/interest-aptos-v2';

import { Quest } from '@/server/model/quest';
import { PoolToken } from '@/views/pools/pools.types';

export const logDepositPool = (
  address: string,
  tokenA: PoolToken,
  tokenB: PoolToken,
  network: Network,
  txDigest: string
) =>
  fetch(`/api/v1/log-quest?network=${network}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      address,
      txDigest,
      kind: 'addLiquidity',
      data: {
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
    } as Omit<Quest, 'timestamp'>),
  });
