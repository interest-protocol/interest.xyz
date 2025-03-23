import { AccountAddress } from '@aptos-labs/ts-sdk';

import { IPool } from '@/interface';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

export const POOLS: ReadonlyArray<IPool> = [
  {
    algorithm: 'curve',
    poolAddress:
      '0x486cc5aacea27797e8f47971ac5b0bc301d1aafd9b5510811360a7d28768ad39',
    tokensAddresses: [
      '0xa',
      '0xa8ba601f7af42c34d2cd2feee9d41e62160dcd77dd07a9e2308dff07b2a258e1',
    ],
    tokensMetadata: [
      {
        decimals: 8,
        name: 'Move Coin',
        symbol: 'MOVE',
        type: '0x000000000000000000000000000000000000000000000000000000000000000a',
        standard: TokenStandard.FA,
      },
      {
        decimals: 8,
        name: 'Test123',
        symbol: 'TEST123',
        standard: TokenStandard.FA,
        type: '0x795ccc8807a0a5a993d7416f9701bd88558c759be432deab279ca7e6d97abb08',
      },
    ],
  },
];

export const fasByPool = POOLS.map(({ tokensAddresses }) =>
  tokensAddresses.map((tokenAddress) => AccountAddress.from(tokenAddress))
);
