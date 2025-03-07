import { AccountAddress } from '@aptos-labs/ts-sdk';

export const COIN_TYPE_TO_FA = {
  ['0x1::aptos_coin::AptosCoin']: '0xa',
};

export const FIRE = {
  address: AccountAddress.from(
    '0x5f7f59e38a96dfe79830f53fe49a19e770f70a13ff30ce598a49e8f0a2b46861'
  ),
  decimals: 8,
  iconUri:
    'https://raw.githubusercontent.com/kitelabs-io/mvmt-tokens/main/logos/FAKE.png',
  name: '🔥',
  projectUri: 'www.interest.xyz',
  symbol: '🔥',
};

export const MOVE = {
  address: AccountAddress.from('0xa'),
  decimals: 8,
  iconUri: 'https://explorer.movementnetwork.xyz/logo.png',
  name: 'Move Coin',
  projectUri: 'https://movementnetwork.xyz',
  symbol: 'MOVE',
};

export const TOKENS = [MOVE, FIRE];

export const COINS_EXPOSED = [MOVE, FIRE];
