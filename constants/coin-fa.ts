import { AccountAddress } from '@aptos-labs/ts-sdk';
import { COINS } from '@interest-protocol/interest-aptos-v2';
import {
  COIN_TYPES,
  FA_ADDRESSES,
  FUNGIBLE_ASSETS,
} from '@interest-protocol/interest-aptos-v2';
import { Network } from '@interest-protocol/interest-aptos-v2';
import { values } from 'ramda';

const MOVEMENT_MAINNET_COINS = COIN_TYPES[Network.MovementMainnet];
const MOVEMENT_MAINNET_FAS = FA_ADDRESSES[Network.MovementMainnet];

export const COIN_TYPE_TO_FA = {
  [MOVEMENT_MAINNET_COINS.APT]: MOVEMENT_MAINNET_FAS.APT,
  [MOVEMENT_MAINNET_COINS.USDC]: MOVEMENT_MAINNET_FAS.USDC,
  [MOVEMENT_MAINNET_COINS.USDT]: MOVEMENT_MAINNET_FAS.USDT,
  [MOVEMENT_MAINNET_COINS.WBTC]: MOVEMENT_MAINNET_FAS.WBTC,
  [MOVEMENT_MAINNET_COINS.WETH]: MOVEMENT_MAINNET_FAS.WETH,
};

export const MOMO = {
  address: AccountAddress.from(
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  ),
  decimals: 6,
  iconUri:
    'https://drive.google.com/file/d/1OqJHbmmuLuyw7XJUciBaNtitcFigfXM3/preview',
  name: 'Momo Coin',
  projectUri: '',
  symbol: 'MOMO',
};

export const RUCO = {
  address: AccountAddress.from(
    '0xf0949330b384afdfce50661211adec99aaafb70f2c5ddee993fec4b60947b31e'
  ),
  decimals: 9,
  iconUri: 'https://i.ibb.co/GndJSFF/Me-Dsci-6-400x400.jpg',
  name: 'Rushi & Coops',
  projectUri: '',
  symbol: 'RUCO',
};

export const TOKENS = [
  ...values(COINS[Network.MovementMainnet]),
  ...values(FUNGIBLE_ASSETS[Network.MovementMainnet]),
  RUCO,
  MOMO,
];
