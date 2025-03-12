import BigNumber from 'bignumber.js';
import { KeyedMutator } from 'swr';

export enum TokenStandard {
  COIN = 'v1',
  FA = 'v2',
}

export type AssetMetadata = {
  name: string;
  type: string;
  symbol: string;
  iconUri?: string;
  decimals: number;
  projectUri?: string;
  standard: TokenStandard;
};

export interface AssetWithPrice extends AssetMetadata {
  usdPrice?: number;
  usdPrice24Change?: number;
}

export interface Asset extends AssetWithPrice {
  balance: BigNumber;
}

export interface UseCoins {
  loading: boolean;
  error: string | null;
  mutate: KeyedMutator<void>;
  coins: ReadonlyArray<Asset>;
  coinsMap: Record<string, Asset>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setMutate: (mutate: KeyedMutator<void>) => void;
  setCoins: (coins: Record<string, Asset>) => void;
}
