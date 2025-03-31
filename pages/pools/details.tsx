import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { withAddressGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { PoolPageProps } from '@/interface';
import { ZERO_BIG_NUMBER } from '@/utils';
import PoolDetails from '@/views/pool-details';
import { PoolDetailsProvider } from '@/views/pool-details/pool-details.context';
import { IPoolForm } from '@/views/pools/pools.types';

const PoolDetailsPage: NextPage<PoolPageProps> = ({ address }) => {
  const form = useForm<IPoolForm>({
    defaultValues: {
      tokenList: [
        { symbol: '', valueBN: ZERO_BIG_NUMBER, value: '' },
        { symbol: '', valueBN: ZERO_BIG_NUMBER, value: '' },
      ],
      lpCoin: { symbol: '', valueBN: ZERO_BIG_NUMBER, value: '' },
      settings: { slippage: '0.1' },
      pool: { poolAddress: address },
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Pool Details" />
      <PoolDetailsProvider address={address}>
        <PoolDetails />
      </PoolDetailsProvider>
    </FormProvider>
  );
};

export default withAddressGuard(Routes[RoutesEnum.Pools])(PoolDetailsPage);
