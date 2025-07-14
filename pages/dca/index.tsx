import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import DCA from '@/views/dca';
import { IPoolForm } from '@/views/pools/pools.types';

const DCAPage: NextPage = () => {
  const form = useForm<IPoolForm>({
    defaultValues: {
      filterList: [],
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Pools" />
      <DCA />
    </FormProvider>
  );
};

export default DCAPage;
