import { AccountAddress } from '@aptos-labs/ts-sdk';

import { Pools } from '@/interface';

export const POOLS: ReadonlyArray<Pools> = [
  {
    decimals: 8,
    name: 'MOVE/TEST',
    algorithm: 'curve',
    symbol: 'MOVE/TEST',
    projectUri: 'https://www.interest.xyz',
    address: AccountAddress.from(
      '0xdfa2be63f0a812001c537a9dd283b76bb31138846a9129bd39855979f04ab87b'
    ),
    fas: [
      AccountAddress.from('0xa'),
      AccountAddress.from(
        '0x795ccc8807a0a5a993d7416f9701bd88558c759be432deab279ca7e6d97abb08'
      ),
    ],
  },
];

export const fasByPool = POOLS.map(({ fas }) => fas);
