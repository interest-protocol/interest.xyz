import { Network } from '@interest-protocol/interest-aptos-v2';
import { FC } from 'react';

import {
  BTCSVG,
  ETHSVG,
  FireEmojiSVG,
  MOVESVG,
  NETHSVG,
  USDCSVG,
  USDTSVG,
} from '@/components/svg';

import { SVGProps } from '../svg/svg.types';

export const TOKEN_ICONS = {
  [Network.MovementMainnet]: {
    ['WETH.e']: ETHSVG,
    ['WBTC.e']: BTCSVG,
    ['USDC.e']: USDCSVG,
    ['USDT.e']: USDTSVG,
    MOVE: MOVESVG,
    ['🔥']: FireEmojiSVG,
    nETH: NETHSVG,
    RUCO: '/images/ruco.webp',
    MOMO: 'images/momo.webp',
  },
} as unknown as Record<Network, Record<string, string | FC<SVGProps>>>;
