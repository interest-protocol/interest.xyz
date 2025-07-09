import {
  BTCSVG,
  ETHSVG,
  FireEmojiSVG,
  MOVESVG,
  NETHSVG,
  USDCSVG,
  USDTSVG,
} from '@/components/svg';
import { Network } from '@/constants';

import { DefaultTokenIcons } from './token-icon.types';

const DEFAULT_TOKEN_ICON = {
  ['WETH.e']: {
    bg: 'rgb(95, 121, 227)',
    color: 'rgb(247, 247, 247)',
    Icon: ETHSVG,
  },
  ['WBTC.e']: {
    bg: 'rgb(240, 142, 28)',
    color: 'rgb(247, 247, 247)',
    Icon: BTCSVG,
  },
  ['USDC.e']: {
    bg: 'rgb(38, 113, 196)',
    color: 'rgb(247, 247, 247)',
    Icon: USDCSVG,
  },
  ['USDT.e']: {
    bg: 'rgb(35, 156, 117)',
    color: 'rgb(247, 247, 247)',
    Icon: USDTSVG,
  },
  MOVE: {
    bg: 'rgb(247, 201, 17)',
    color: 'rgb(0, 0, 0)',
    Icon: MOVESVG,
  },
  ['🔥']: { bg: 'transparent', Icon: FireEmojiSVG },
  nETH: { Icon: NETHSVG },
  mUSD: { url: '/images/mUSD.webp' },
  mBTC: { url: 'https://assets.echo-protocol.xyz/mbtc.svg' },
  RUCO: { url: '/images/ruco.webp' },
  MOMO: { url: 'images/momo.webp' },
};

export const TOKEN_ICONS: DefaultTokenIcons = {
  [Network.BARDOCK]: {},
  [Network.APTOS_TESTNET]: {},
  [Network.MovementMainnet]: DEFAULT_TOKEN_ICON,
  [Network.MAINNET]: DEFAULT_TOKEN_ICON,
};
