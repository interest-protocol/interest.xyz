import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';
import { InterestCurve } from '@interest-protocol/interest-aptos-curve';

import { INDEXER_URL, Network, RPC_URL } from '@/constants';

const network = Network.MAINNET;

const client = new Aptos(
  new AptosConfig({ indexer: INDEXER_URL[network], fullnode: RPC_URL[network] })
);

export const curveDex = new InterestCurve({ network, client });

export const useInterestCurveDex = () => curveDex;
