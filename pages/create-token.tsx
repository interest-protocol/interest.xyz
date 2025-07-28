import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { MOVE } from '@/constants/coins';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import CreateToken from '@/views/create-token';
import { CreateTokenFormStep } from '@/views/create-token/create-token.types';
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
      supply: 1_000_000_000,
      step: CreateTokenFormStep.PresetInfo,
    },
  });

  const { data: price } = useCoinsPrice(MOVE.type);

  useEffect(() => {
    if (price)
      form.setValue('pool.quoteUsdPrice' as never, price[0].price as never);
  }, [price]);

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Create Token" />
      <CreateToken />
    </FormProvider>
  );
};

export default CreateTokenPage;
