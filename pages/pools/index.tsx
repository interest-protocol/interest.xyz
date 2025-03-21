import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import Pools from '@/views/pools';
import { FormFilterValue } from '@/views/pools/pool-v2-card/pool-card.types';
import { FilterTypeEnum, IPoolForm } from '@/views/pools/pools.types';

const PoolsPage: NextPage = () => {
  const form = useForm<IPoolForm>({
    defaultValues: {
      filterList: [
        { type: FilterTypeEnum.CATEGORY, value: FormFilterValue.official },
      ],
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
