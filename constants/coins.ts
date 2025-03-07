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

export const USDCe = {
  address: AccountAddress.from(
    '0x83121c9f9b0527d1f056e21a950d6bf3b9e9e2e8353d0e95ccea726713cbea39'
  ),
  decimals: 6,
  iconUri:
    'https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/Brand/USDC/USDC_Icon.svg',
  name: 'USDC.e',
  projectUri: '',
  symbol: 'USDC.e',
};

export const USDTe = {
  address: AccountAddress.from(
    '0x447721a30109c662dde9c73a0c2c9c9c459fb5e5a9c92f03c50fa69737f5d08d;'
  ),
  decimals: 6,
  iconUri: 'https://tether.to/images/logoCircle.svg',
  name: 'USDT.e',
  projectUri: '',
  symbol: 'USDT.e',
};

export const WETHe = {
  address: AccountAddress.from(
    '0x908828f4fb0213d4034c3ded1630bbd904e8a3a6bf3c63270887f0b06653a376;'
  ),
  decimals: 8,
  iconUri: 'https://etherscan.io/token/images/weth_28.png',
  name: 'WETH.e',
  projectUri: '',
  symbol: 'WETH.e',
};

export const WBTCe = {
  address: AccountAddress.from(
    '0xb06f29f24dde9c6daeec1f930f14a441a8d6c0fbea590725e88b340af3e1939c;'
  ),
  decimals: 8,
  iconUri:
    'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1747036384',
  name: 'WBTC.e',
  projectUri: '',
  symbol: 'WBTC.e',
};

export const TOKENS = [MOVE, FIRE];
