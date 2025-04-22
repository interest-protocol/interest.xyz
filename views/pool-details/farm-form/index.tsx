import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { PoolFarmsOption } from '../pool-details.types';
import PoolFormFarms from './farm-form-stake';

const FarmForm: FC = () => {
  const { setValue } = useFormContext<IPoolForm>();
  const [poolFarmOptionView, setFarmOptionView] = useState<PoolFarmsOption>(
    PoolFarmsOption.Stake
  );

  useEffect(() => {
    setValue('lpCoin.value', '');
    setValue('tokenList.0.value', '');
    setValue('tokenList.1.value', '');
    setValue('lpCoin.valueBN', ZERO_BIG_NUMBER);
    setValue('tokenList.0.valueBN', ZERO_BIG_NUMBER);
    setValue('tokenList.1.valueBN', ZERO_BIG_NUMBER);
  }, [poolFarmOptionView]);

  return (
    <>
      <Box display="flex" justifyContent={['center', 'flex-start']}>
        <Tabs
          type="circle"
          onChangeTab={setFarmOptionView}
          items={['Stake', 'Unstake']}
          defaultTabIndex={poolFarmOptionView}
        />
      </Box>
      <Box gridColumn="1/-1">
        <PoolFormFarms farmMode={poolFarmOptionView} />
      </Box>
    </>
  );
};

export default FarmForm;
