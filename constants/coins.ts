import { AccountAddress } from '@aptos-labs/ts-sdk';

export const FAKE = {
  address: AccountAddress.from(
    '0x2092ebb9cd4279c252efd4a778d143ad65d759401773b4fbbc163513e04ac108'
  ),
  decimals: 8,
  iconUri:
    'https://raw.githubusercontent.com/kitelabs-io/mvmt-tokens/main/logos/FAKE.png',
  name: 'FAKE',
  projectUri: '',
  symbol: 'FAKE',
};
export const MOVE = {
  address: AccountAddress.from('0xa'),
  decimals: 8,
  iconUri: 'https://explorer.movementnetwork.xyz/logo.png',
  name: 'Move Coin',
  projectUri: 'https://movementnetwork.xyz',
  symbol: 'MOVE',
};

export const TOKENS = [MOVE, FAKE];

export const COINS_EXPOSED = [MOVE, FAKE];
