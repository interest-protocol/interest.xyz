import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';
import { InterestV2, Network } from '@interest-protocol/interest-aptos-v2';

import { INDEXER_URL, RPC_URL } from '@/constants';

const network = Network.MovementMainnet;

const client = new Aptos(
  new AptosConfig({ indexer: INDEXER_URL[network], fullnode: RPC_URL[network] })
);

const dex = new InterestV2({ network, client });

export const useInterestDex = () => dex;
