import { AccountAddress } from '@aptos-labs/ts-sdk';

import { IPool } from '@/interface';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

export const POOLS: ReadonlyArray<IPool> = [
  {
    curve: 'stable',
    algorithm: 'curve',
    poolAddress:
      '0x691877d4f5d4c1177d02f6ca3d399df4624af265533d305c008f6cb15d1567bc',
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
  {
    curve: 'volatile',
    algorithm: 'curve',
    poolAddress:
      '0x54c89a961dd60e30f1c03ba2c6f5a052e7ed0ba36fcca3c1153f06449199b285',
    tokensAddresses: [
      '0x83121c9f9b0527d1f056e21a950d6bf3b9e9e2e8353d0e95ccea726713cbea39',
      '0x447721a30109c662dde9c73a0c2c9c9c459fb5e5a9c92f03c50fa69737f5d08d',
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
        decimals: 6,
        name: 'USDT.e',
        symbol: 'USDT.e',
        type: '0x447721a30109c662dde9c73a0c2c9c9c459fb5e5a9c92f03c50fa69737f5d08d',
        standard: TokenStandard.FA,
      },
    ],
  },
];

export const fasByPool = POOLS.map(({ tokensAddresses }) =>
  tokensAddresses.map((tokenAddress) => AccountAddress.from(tokenAddress))
);
