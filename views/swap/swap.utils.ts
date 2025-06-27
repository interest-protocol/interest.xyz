import { AccountAddress } from '@aptos-labs/ts-sdk';

import { Network } from '@/constants';
import { fasByPool } from '@/constants/pools';
import { Quest } from '@/server/model/quest';

import { SwapToken } from './swap.types';

export const logSwap = (
  address: string,
  from: SwapToken,
  to: SwapToken,
  network: Network,
  txDigest: string
) =>
  fetch(`https://api.interestlabs.io/v1/quests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      quest: {
        address,
        txDigest,
        kind: 'swap',
        data: {
          coinIn: {
            type: from.type,
            amount: from.value,
            symbol: from.symbol,
          },
          coinOut: {
            type: to.type,
            amount: to.value,
            symbol: to.symbol,
          },
        },
      },
      profileField: 'swap',
      network,
    } as Omit<Quest, 'timestamp'>),
  });

const getFaOptions = (fa: AccountAddress) =>
  fasByPool.reduce((acc, fas) => {
    if (fas.some((faItem: AccountAddress) => faItem.equals(fa)))
      return [
        ...acc,
        fas.find((faItem: AccountAddress) => !faItem.equals(fa))!,
      ];
    return acc;
  }, [] as ReadonlyArray<AccountAddress>);

export const getPath = (typeIn: string, typeOut: string) => {
  const [faIn, faOut] = [typeIn, typeOut].map((type) =>
    AccountAddress.from(type)
  );

  const faInOptions = getFaOptions(faIn);

  if (faInOptions.some((fa) => fa?.equals(faOut))) return [faIn, faOut];

  const faOutOptions = getFaOptions(faOut);
  if (
    faInOptions.some((faInOption) =>
      faOutOptions.some((faOutOption) => faOutOption.equals(faInOption))
    )
  )
    return [
      faIn,
      faInOptions.find((faInOption) =>
        faOutOptions.some((faOutOption) => faOutOption.equals(faInOption))
      )!,
      faOut,
    ];

  const faInInnerOptions: ReadonlyArray<
    [AccountAddress, ReadonlyArray<AccountAddress>]
  > = faInOptions.map((faInOption) => [faInOption, getFaOptions(faInOption)]);

  if (
    faInInnerOptions.some(([, faInInnerOptionList]) =>
      faInInnerOptionList.some((faInOption) =>
        faOutOptions.some((faOutOption) => faOutOption.equals(faInOption))
      )
    )
  ) {
    const internalFas = faInInnerOptions.reduce(
      (acc, [targetFa, targetFaOptions]) => {
        const target4thLevel = targetFaOptions.find((faInOption) =>
          faOutOptions.some((faOutOption) => faOutOption.equals(faInOption))
        );

        if (target4thLevel)
          return [targetFa, target4thLevel] as [AccountAddress, AccountAddress];

        return acc;
      },
      [] as unknown as [AccountAddress, AccountAddress]
    );

    return [faIn, ...internalFas, faOut];
  }
  return [];
};
