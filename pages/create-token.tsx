import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { MOVE } from '@/constants/coin-fa';
import { parseToMetadata } from '@/utils';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';
import CreateToken from '@/views/create-token';
import { validationSchema } from '@/views/create-token/create-token-form/create-token-form.validation';

const CreateTokenPage: NextPage = () => {
  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      decimals: 8,
      fixedSupply: true,
      pool: { active: true },
    },
  });
  const MOVE_PARSED = parseToMetadata(
    MOVE as unknown as CoinMetadata | FAMetadata
  );
  useEffect(() => {
    fetch(`https://api.mosaic.ag/v1/prices?ids[]=${MOVE_PARSED.type}`, {
      method: 'GET',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        'x-api-key': 'tYPtSqDun-w9Yrric2baUAckKtzZh9U0',
      },
    })
      .then((response) => response.json())
      .then(({ data }) =>
        form.setValue(
          'pool.quoteUsdPrice' as never,
          data.priceById[MOVE_PARSED.type].price as never
        )
      )
      .catch(() => null);
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Create Token" />
      <CreateToken />
    </FormProvider>
  );
};

export default CreateTokenPage;
