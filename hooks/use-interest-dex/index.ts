import {
  getDefaultClient,
  InterestV2,
  Network,
} from '@interest-protocol/interest-aptos-v2';

const network = Network.MovementMainnet;

const client = getDefaultClient(network);

const dex = new InterestV2({ network, client });

export const useInterestDex = () => dex;
