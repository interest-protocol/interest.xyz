import { Network } from '@interest-protocol/interest-aptos-v2';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const TREASURY =
  '0xba515545b9681def6f170b6a3a533368c3404f2a91e8842150d08ba377aabd34';

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = 'v5';

export const PAGE_SIZE = 50;

export const RPC_URL = {
  [Network.MovementMainnet]: 'https://mainnet.movementlabs.xyz/v1',
};

export const INDEXER_URL = {
  [Network.MovementMainnet]: 'https://mainnet.movementnetwork.xyz/v1/graphql',
};

export const EXPLORER_URL = {
  [Network.MovementMainnet]: (path: string) =>
    `https://mainnet.movementnetwork.xyz/${path}`,
} as Record<Network, (path: string) => string>;

export const TOAST_DURATION = 10000;

export * from './routes';
