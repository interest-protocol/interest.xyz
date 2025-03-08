import type { AccountAddress } from '@aptos-labs/ts-sdk';

import { Token } from '@/interface';

export interface CoinMetadata {
  type: string;
  name: string;
  symbol: string;
  iconUri: string;
  decimals: number;
}

export interface FAMetadata {
  name: string;
  symbol: string;
  iconUri: string;
  decimals: number;
  projectUri?: undefined;
  address: AccountAddress;
}

export interface ClientMetadata {
  name: string;
  symbol: string;
  decimals: number;
  asset_type: string;
  token_standard: string;
  supply_v2?: any | null;
  maximum_v2?: any | null;
  icon_uri?: string | null;
  project_uri?: string | null;
}

export type MetadataSources =
  | CoinMetadata
  | FAMetadata
  | ClientMetadata
  | Token;
