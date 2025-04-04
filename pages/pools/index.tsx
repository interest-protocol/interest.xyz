import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Pools from '@/views/pools';
import { IPoolForm } from '@/views/pools/pools.types';

const PoolsPage: NextPage = () => {
  const form = useForm<IPoolForm>({
    defaultValues: {
      filterList: [],
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Pools" />
      <Pools />
    </FormProvider>
  );
};

export default PoolsPage;
