import type { AccountAddress } from '@aptos-labs/ts-sdk';

import { Token } from '@/interface';

export interface Metadata {
  name: string;
  symbol: string;
  iconUri: string;
  decimals: number;
}

export interface CoinMetadata extends Metadata {
  type: string;
}

export interface FAMetadata extends Metadata {
  projectUri?: string;
  address: AccountAddress;
}

export interface APIMetadata extends Omit<CoinMetadata, 'iconUri'> {
  iconUrl: string;
}

export interface ClientMetadata extends Omit<Metadata, 'iconUri'> {
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
  | APIMetadata
  | Token;
