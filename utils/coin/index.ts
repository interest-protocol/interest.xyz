import {
  AccountAddress,
  Aptos,
  InputViewFunctionData,
} from '@aptos-labs/ts-sdk';
import {
  COINS,
  FUNGIBLE_ASSETS,
  normalizeSuiAddress,
} from '@interest-protocol/interest-aptos-v2';
import { Network } from '@interest-protocol/interest-aptos-v2';
import { pathOr, propOr, values } from 'ramda';
import invariant from 'tiny-invariant';

import { CoinBalance } from '@/interface';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';

import {
  APIMetadata,
  ClientMetadata,
  CoinMetadata,
  FAMetadata,
  MetadataSources,
} from './coin.types';

export const isAptosCoin = (type: string) =>
  type?.endsWith('1::aptos_coin::AptosCoin');

export const isAptosFA = (type: string) => Number(type) === 0xa;

export const isAptos = (type: string) => isAptosFA(type) || isAptosCoin(type);

export const getCoinTypeFromCoinStoreType = (coinStoreType: string) =>
  coinStoreType.split('<')[1].split('>')[0];

export const getAddressCoinBalances = async (
  account: string,
  client: Aptos
): Promise<CoinBalance[]> => {
  const data = await client.getAccountResources({
    accountAddress: AccountAddress.from(account),
  });

  return data
    .filter((resource) => resource.type.startsWith('0x1::coin::CoinStore'))
    .map((resource) => ({
      type: getCoinTypeFromCoinStoreType(resource.type),
      balance: BigInt(pathOr(0, ['data', 'coin', 'value'], resource)),
    }));
};

export const getFaPrimaryStore = async (
  owner: string,
  fa: string,
  client: Aptos
) => {
  try {
    const payload: InputViewFunctionData = {
      function: `0x1::primary_fungible_store::primary_store`,
      functionArguments: [owner, fa],
      typeArguments: ['0x1::fungible_asset::Metadata'],
    };

    const data = await client.view({ payload });

    invariant(data.length > 0, 'Data is empty');

    const inner = propOr('', 'inner', data[0]);

    invariant(inner, 'Inner is empty');

    const x = await client.getAccountResource({
      accountAddress: inner as `${string}::${string}::${string}`,
      resourceType: `0x1::fungible_asset::FungibleStore`,
    });

    const key: string = pathOr('', ['metadata', 'inner'], x);

    return {
      balance: BigInt(propOr(0, 'balance', x)),
      frozen: propOr(false, 'frozen', x),
      fa: FUNGIBLE_ASSETS[Network.MovementMainnet][key],
    };
  } catch {
    return {
      balance: BigInt(0),
      frozen: false,
      fa: FUNGIBLE_ASSETS[Network.MovementMainnet][fa],
    };
  }
};

export const parseToMetadata = (metadata: MetadataSources): AssetMetadata => {
  const name = metadata.name ?? '';
  const symbol = metadata.symbol ?? '';
  const decimals = metadata.decimals ?? 0;

  const type = String(
    (metadata as CoinMetadata | APIMetadata).type ??
      (metadata as FAMetadata).address ??
      (metadata as ClientMetadata).asset_type
  );

  const standard = (metadata as CoinMetadata | APIMetadata).type
    ? type.split('::').length === 1
      ? TokenStandard.FA
      : TokenStandard.COIN
    : (metadata as FAMetadata).address
      ? TokenStandard.FA
      : ((metadata as ClientMetadata).token_standard as TokenStandard);

  const iconUri =
    (metadata as CoinMetadata | FAMetadata).iconUri ??
    (metadata as ClientMetadata).icon_uri ??
    (metadata as APIMetadata).iconUrl ??
    undefined;

  const projectUri =
    (metadata as FAMetadata).projectUri ??
    (metadata as ClientMetadata).project_uri ??
    undefined;

  return {
    type,
    name,
    decimals,
    standard,
    symbol: symbol,
    ...(iconUri && { iconUri }),
    ...(projectUri && { projectUri }),
  };
};

export const getCoinMetadata = (
  type: string
): CoinMetadata | FAMetadata | Promise<APIMetadata> => {
  const metadata =
    values(COINS[Network.MovementMainnet]).find((coin) => coin.type === type) ??
    values(FUNGIBLE_ASSETS[Network.MovementMainnet]).find((fa) =>
      fa.address.equals(AccountAddress.from(type))
    );

  if (metadata) return metadata as CoinMetadata | FAMetadata;

  return getCoinMetadataFromAPI(type);
};

const getCoinMetadataFromAPI = (type: string): Promise<APIMetadata> =>
  fetch(
    `https://api.interestlabs.io/v1/coins/mainnet/metadatas/${normalizeSuiAddress(type)}`,
    { headers: { network: 'movement' } }
  ).then((res) => res.json());

export const getCoinsMetadataFromAPI = (
  types: ReadonlyArray<string>
): Promise<ReadonlyArray<APIMetadata>> =>
  fetch(
    `https://api.interestlabs.io/v1/coins/mainnet/metadatas?coinTypes=${types.map((type) => normalizeSuiAddress(type)).join(',')}`,
    { headers: { network: 'movement' } }
  ).then((res) => res.json());
