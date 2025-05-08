import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { TOKENS } from '@/constants/coins';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';
import SwapComponent from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';
import SwapInitManager from '@/views/swap/swap-init-manager';

const SwapPage: NextPage = () => {
  const form = useForm<SwapForm>({
    defaultValues: {
      from: {
        ...parseToMetadata({
          name: TOKENS[0].name,
          symbol: TOKENS[0].symbol,
          iconUri: TOKENS[0].iconUri,
          address: TOKENS[0].address,
          decimals: TOKENS[0].decimals,
          projectUri: TOKENS[0].projectUri ?? '',
        } as FAMetadata),
        value: '',
        valueBN: ZERO_BIG_NUMBER,
      },
      to: {
        ...parseToMetadata(TOKENS[1] as unknown as CoinMetadata | FAMetadata),
        value: '',
        valueBN: ZERO_BIG_NUMBER,
      },
      settings: {
        slippage: '1',
      },
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Trade" />
      <SwapInitManager />
      <SwapComponent />
    </FormProvider>
  );
};

export default SwapPage;
