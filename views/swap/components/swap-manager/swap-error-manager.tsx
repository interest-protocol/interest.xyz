import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import BigNumber from 'bignumber.js';
import { FC, useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

import { SwapMessagesEnum } from '../swap.data';
import { SwapForm, SwapMessagesProps } from '../swap.types';

export const SwapErrorManager: FC<SwapMessagesProps> = ({ hasNoMarket }) => {
  const { control, setValue } = useFormContext<SwapForm>();
  const { coinsMap } = useCoins();

  const from = useWatch({ control, name: 'from' });
  const to = useWatch({ control, name: 'to' });
  const swapping = useWatch({ control, name: 'swapping' });
  const error = useWatch({ control, name: 'error' });

  const coin = coinsMap[normalizeSuiAddress(from?.type)];

  const balance = FixedPointMath.toNumber(
    coin?.balance ?? ZERO_BIG_NUMBER,
    coin?.decimals ?? coin?.decimals
  );

  const valueIn = useWatch({ control, name: 'from.value' });

  const isGreaterThanBalance = useMemo(() => {
    if (!from || !coinsMap[normalizeSuiAddress(from.type)]) return false;

    const fromValueBN = FixedPointMath.toBigNumber(
      from.value ?? '0',
      from.decimals ?? 0
    ).decimalPlaces(0, BigNumber.ROUND_DOWN);

    return fromValueBN.gt(
      BigNumber(coinsMap[normalizeSuiAddress(from.type)].balance)
    );
  }, [from, coinsMap]);

  const hasAtLeastOneMove = useMemo(() => {
    if (!isAptos(from?.type)) return false;

    const balanceMinusFee =
      coinsMap[normalizeSuiAddress(from.type)]?.balance.minus(
        BigNumber(1000000)
      ) ?? ZERO_BIG_NUMBER;
    const fromValue = Number(from?.value ?? '0');

    return FixedPointMath.toNumber(balanceMinusFee, from.decimals) < fromValue;
  }, [from, coinsMap]);

  useEffect(() => {
    if (!from?.value || !to?.value || swapping) return;

    let newError = null;

    if (hasNoMarket) {
      newError = String(SwapMessagesEnum.noMarket);
    } else if (from.type === to.type) {
      newError = String(SwapMessagesEnum.sameCoin);
    } else if (Number(valueIn) > Number(balance)) {
      newError = String(SwapMessagesEnum.insufficientBalance);
    } else if (hasAtLeastOneMove) {
      newError = String(SwapMessagesEnum.leastOneMove);
    } else if (isGreaterThanBalance) {
      newError = String(SwapMessagesEnum.notEnoughToken);
    }

    if (newError !== error) {
      setValue('error', newError);
    }
  }, [
    error,
    from,
    to,
    hasNoMarket,
    hasAtLeastOneMove,
    isGreaterThanBalance,
    swapping,
    setValue,
  ]);

  return null;
};
