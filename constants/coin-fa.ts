import { AccountAddress } from '@aptos-labs/ts-sdk';
import { COINS } from '@interest-protocol/aptos-move-dex';
import {
  COIN_TYPES,
  FA_ADDRESSES,
  FUNGIBLE_ASSETS,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';

const PORTO_COINS = COIN_TYPES[Network.Porto];
const PORTO_FAS = FA_ADDRESSES[Network.Porto];

export const COIN_TYPE_TO_FA = {
  [PORTO_COINS.APT]: PORTO_FAS.APT,
  [PORTO_COINS.USDC]: PORTO_FAS.USDC,
  [PORTO_COINS.USDT]: PORTO_FAS.USDT,
  [PORTO_COINS.WBTC]: PORTO_FAS.WBTC,
  [PORTO_COINS.WETH]: PORTO_FAS.WETH,
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
  ...values(COINS[Network.Porto]),
  ...values(FUNGIBLE_ASSETS[Network.Porto]),
  RUCO,
  MOMO,
];

export const COINS_EXPOSED = [
  RUCO,
  MOMO,
  FUNGIBLE_ASSETS[Network.Porto][FA_ADDRESSES[Network.Porto].NETH.toString()],
  FUNGIBLE_ASSETS[Network.Porto][FA_ADDRESSES[Network.Porto].WETH.toString()],
  FUNGIBLE_ASSETS[Network.Porto][FA_ADDRESSES[Network.Porto].USDT.toString()],
  FUNGIBLE_ASSETS[Network.Porto][FA_ADDRESSES[Network.Porto].USDC.toString()],
  FUNGIBLE_ASSETS[Network.Porto][FA_ADDRESSES[Network.Porto].APT.toString()],
];
