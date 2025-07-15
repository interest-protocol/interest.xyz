import { useAptosWallet } from '@razorlabs/wallet-kit';
import BigNumber from 'bignumber.js';
import { FC, memo, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TREASURY } from '@/constants';
import { EXCHANGE_FEE_BPS } from '@/constants/fees';
import { FixedPointMath } from '@/lib';

import { MosaicQuoteResponse } from '../../swap.types';
import { SwapManagerEquivalenceProps } from './additional-info.types';

const SwapManagerEquivalence: FC<SwapManagerEquivalenceProps> = ({
  setAmount,
}) => {
  const { getValues, control } = useFormContext();
  const from = useWatch({
    control,
    name: 'from',
  });
  const to = useWatch({
    control,
    name: 'to',
  });
  const { account } = useAptosWallet();

  useEffect(() => {
    const slippage = (getValues('settings.slippage') * 100).toFixed(0);

    fetch(
      `https://api.mosaic.ag/v1/quote?srcAsset=${from.type}&dstAsset=${to.type}&amount=${FixedPointMath.toBigNumber(1, from.decimals)}&feeInBps=${EXCHANGE_FEE_BPS}&feeReceiver=${TREASURY}&includeSources=interest_v2,interest_curve_stable,interest_curve_volatile&slippage=${slippage}&sender=${account?.address ?? '0x0'}`,
      {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          'x-api-key': 'tYPtSqDun-w9Yrric2baUAckKtzZh9U0',
        },
      }
    )
      .then((res) => res.json?.())
      .then((data: MosaicQuoteResponse) => {
        if (data.message !== 'successfully') {
          setAmount('--');
          throw new Error('Not successfully');
        }

        const value = BigNumber(data.data.dstAmount);

        setAmount(`${FixedPointMath.toNumber(value, to.decimals)}`);
      })
      .catch((e) => {
        console.warn(e);
        setAmount('--');
      });
  }, [from, to]);

  return null;
};

export default memo(SwapManagerEquivalence);
