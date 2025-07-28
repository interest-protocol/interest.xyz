import BigNumber from 'bignumber.js';
import { UseFormSetValue } from 'react-hook-form';

export interface ICreateTokenPool {
  active: boolean;
  quoteValue: string;
  tokenValue: string;
  quoteUsdPrice: number;
  quoteValueBN: BigNumber;
  tokenValueBN: BigNumber;
}

export enum CreateTokenFormStep {
  PresetInfo,
  Deploy,
}
export interface ICreateTokenForm {
  name: string;
  error: string;
  symbol: string;
  supply: number;
  decimals: number;
  step: CreateTokenFormStep;
  imageUrl?: string;
  projectUrl?: string;
  description?: string;
  fixedSupply: boolean;
  explorerLink: string;
  executionTime: string;
  deploy_pool_instantly: boolean;
  pool: ICreateTokenPool;
}

export interface CreateTokenFormImageProps {
  setValue: UseFormSetValue<ICreateTokenForm>;
}
