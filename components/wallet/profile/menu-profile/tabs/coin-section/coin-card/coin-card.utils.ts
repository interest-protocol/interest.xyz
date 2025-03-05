import { Network } from '@interest-protocol/interest-aptos-v2';

import { Quest } from '@/server/model/quest';

export const logWrapCoin = (
  address: string,
  symbol: string,
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
      kind: 'wrapCoin',
      data: {
        symbol,
      },
    } as Omit<Quest, 'timestamp'>),
  });
