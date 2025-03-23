/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountAddress } from '@aptos-labs/ts-sdk';
import { InterestCurvePool } from '@interest-protocol/interest-aptos-curve';
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
  Curve = 'Curve',
  srAMM = 'V2',
}

export interface Pool {
  isVolatile: boolean;
  poolAddress: string;
  poolType: PoolTypeEnum;
  coins: ReadonlyArray<string>;
}

type IV2PoolData = Omit<
  InterestV2Pool,
  'poolAddress' | 'metadataX' | 'metadataY' | 'balanceX' | 'balanceY'
>;

type ICurvePoolData = Omit<InterestCurvePool, 'address' | 'fas' | 'data'> &
  Omit<InterestCurvePool['data'], 'balances'>;

export type IPool = (
  | {
      algorithm: 'v2';
      poolExtraData?: IV2PoolData;
    }
  | {
      algorithm: 'curve';
      poolExtraData?: ICurvePoolData;
    }
) & {
  poolAddress: string;
  poolMetadata?: AssetMetadata;
  balances?: ReadonlyArray<bigint>;
  tokensAddresses: ReadonlyArray<string>;
  tokensMetadata?: ReadonlyArray<AssetMetadata>;
};

export interface Pools {
  name: string;
  symbol: string;
  decimals: number;
  projectUri: string;
  address: AccountAddress;
  algorithm: 'v2' | 'curve';
  fas: ReadonlyArray<AccountAddress>;
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
