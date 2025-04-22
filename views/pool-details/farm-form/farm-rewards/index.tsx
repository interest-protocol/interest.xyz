import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useFarmAccount } from '@/hooks/use-farm-account';
import { IPoolForm } from '@/views/pools/pools.types';

const FarmRewards: FC = () => {
  const { control } = useFormContext<IPoolForm>();
  const { type } = useWatch({ control, name: 'lpCoin' });
  const { data } = useFarmAccount(type);

  console.log({ data });

  return <></>;
};

export default FarmRewards;
