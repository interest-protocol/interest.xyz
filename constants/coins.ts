import { AccountAddress } from '@aptos-labs/ts-sdk';
import { COINS } from '@interest-protocol/aptos-move-dex';
import { Network } from '@interest-protocol/interest-aptos-v2';
import { values } from 'ramda';
export const COIN_TYPE_TO_FA = {
  ['0x1::aptos_coin::AptosCoin']: '0xa',
};

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

export const TOKENS = [...values(COINS[Network.MovementMainnet]), FAKE, MOVE];

export const COINS_EXPOSED = [MOVE, FAKE];
