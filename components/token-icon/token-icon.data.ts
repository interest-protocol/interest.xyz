import { Network } from '@interest-protocol/interest-aptos-v2';
import { FC } from 'react';

import {
  BTCSVG,
  ETHSVG,
  MOVESVG,
  NETHSVG,
  USDCSVG,
  USDTSVG,
} from '@/components/svg';

import { SVGProps } from '../svg/svg.types';

export const TOKEN_ICONS = {
  [Network.MovementMainnet]: {
    ETH: ETHSVG,
    faETH: ETHSVG,
    WETH: ETHSVG,
    faWETH: ETHSVG,
    BTC: BTCSVG,
    faBTC: BTCSVG,
    WBTC: BTCSVG,
    faWBTC: BTCSVG,
    USDC: USDCSVG,
    faUSDC: USDCSVG,
    MOVE: MOVESVG,
    faMOVE: MOVESVG,
    USDT: USDTSVG,
    faUSDT: USDTSVG,
    nETH: NETHSVG,
    RUCO: '/images/ruco.webp',
    MOMO: 'images/momo.webp',
  },
} as unknown as Record<Network, Record<string, string | FC<SVGProps>>>;
