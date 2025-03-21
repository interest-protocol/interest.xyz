import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { FilterTypeEnum } from '@/views/components/farm-filter/farm.types';
import { FormFilterValue } from '@/views/components/info-card/info-card.types';
import Pools from '@/views/pools';
import { IPoolForm } from '@/views/pools/pools.types';

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
