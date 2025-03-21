import { AccountAddress } from '@aptos-labs/ts-sdk';

import { Pools } from '@/interface';

import { MOVE, USDCe, USDTe, WBTCe, WETHe } from './coins';

export const POOLS: ReadonlyArray<Pools> = [
  {
    address: AccountAddress.from(
      '0xe2f780e09eafd359ca5e11fc3d8ff96a4a4a5f0bb3dfdcbc1d6193643f35008a'
    ),
    faX: MOVE.address,
    faY: USDTe.address,
  },
  {
    address: AccountAddress.from(
      '0xdf7dd8b4965de3f63c6d977b4518ea518b9e254023661135ba82bf7c5513d41a'
    ),
    faX: MOVE.address,
    faY: WBTCe.address,
  },
  {
    address: AccountAddress.from(
      '0xc41f4a26f98b72b3c69d253adeb9d4766efb534ce38cb8f5b3e0cc229e0d1f91'
    ),
    faX: MOVE.address,
    faY: USDCe.address,
  },
  {
    address: AccountAddress.from(
      '0x1c015680cfafacf2cddca406572882b5d19af48f335d1211f8a1e1766829abb9'
    ),
    faX: MOVE.address,
    faY: WETHe.address,
  },
];

export const fasByPool = POOLS.map(({ faX, faY }) => [faX, faY]);
