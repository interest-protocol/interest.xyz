/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountAddress } from '@aptos-labs/ts-sdk';
import { InterestV2Pool } from '@interest-protocol/interest-aptos-v2';
import BigNumber from 'bignumber.js';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  type: `0x${string}`;
  decimals: number;
  symbol: string;
}

export interface PoolPageProps {
  address: string;
}

export enum PoolTypeEnum {
  CLAMM = 'CLAMM',
  srAMM = 'V2(SR-AMM)',
}

export interface AmmPoolCoinTypes {
  typeX: string;
  typeY: string;
}

export interface SrAmmPool {
  isVolatile: boolean;
  poolAddress: string;
  poolType: PoolTypeEnum;
  coins: AmmPoolCoinTypes;
}

export interface ISrPool {
  supply: bigint;
  balanceY: bigint;
  balanceX: bigint;
  metadataY: string;
  metadataX: string;
  isSrMode: boolean;
  poolAddress: string;
  bidLiquidity: bigint;
  slotBalanceX: bigint;
  slotBalanceY: bigint;
  lastSlotTimestamp: bigint;
  metadata: {
    x: AssetMetadata;
    y: AssetMetadata;
    pool: AssetMetadata;
  };
}

export interface Pools {
  address: AccountAddress;
  faX: AccountAddress;
  faY: AccountAddress;
  projectUri: string;
  symbol: string;
  name: string;
  decimals: number;
}

export interface SrAmmPoolWithMetadata
  extends Omit<InterestV2Pool, 'metadataX' | 'metadataY'> {
  metadata: AssetMetadata;
  metadataX: AssetMetadata;
  metadataY: AssetMetadata;
}

export interface CoinBalance {
  type: string;
  balance: bigint;
}

export interface SdkSrAmmConfig {
  type: `${string}::${string}::${string}`;
  admin: AccountAddress;
  adminFee: bigint;
  delay: bigint;
  fee: bigint;
  newFaPaymentAmount: bigint;
  pendingAdmin: AccountAddress;
  slotWindow: bigint;
  start: bigint;
  treasury: AccountAddress;
}

export interface PriceResponse {
  coin: string;
  price: number;
  priceChange24HoursPercentage: number;
}

export interface Token {
  type?: string;
  address: AccountAddress;
  decimals: number;
  iconUri: string;
  name: string;
  projectUri: string;
  symbol: string;
}

export interface TokenPrice {
  coin: string;
  base?: string;
  price: number;
  priceChange24HoursPercentage: number;
}

export interface TokenWithPrice extends Token {
  usd: string;
  usdPrice24Change: number;
}
