import { AccountAddress } from '@aptos-labs/ts-sdk';

import { IPool } from '@/interface';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

export const POOLS: ReadonlyArray<IPool> = [
  {
    algorithm: 'curve',
    curve: 'stable',
    poolAddress:
      '0xc4d03e70f504bcf04f21f975cf2eb94723fbe221d834a7a6b0bc72303281d7da',
    tokensAddresses: [
      '0x83121c9f9b0527d1f056e21a950d6bf3b9e9e2e8353d0e95ccea726713cbea39',
      '0xa',
    ],
    tokensMetadata: [
      {
        decimals: 6,
        name: 'USDC.e',
        symbol: 'USDC.e',
        standard: TokenStandard.FA,
        type: '0x83121c9f9b0527d1f056e21a950d6bf3b9e9e2e8353d0e95ccea726713cbea39',
      },
      {
        decimals: 8,
        name: 'Move Coin',
        symbol: 'MOVE',
        type: '0x000000000000000000000000000000000000000000000000000000000000000a',
        standard: TokenStandard.FA,
      },
    ],
  },
];

export const fasByPool = POOLS.map(({ tokensAddresses }) =>
  tokensAddresses.map((tokenAddress) => AccountAddress.from(tokenAddress))
);
