import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { PoolFarmsOption } from '../pool-details.types';
import PoolFormFarms from './pool-form-farms';

const PoolFormActive: FC<{ isStakeForm: boolean }> = ({ isStakeForm }) => (
  <PoolFormFarms
    poolOptionView={
      isStakeForm ? PoolFarmsOption.Stake : PoolFarmsOption.Unstake
    }
  />
);

const FarmForm: FC = () => {
  const { setValue } = useFormContext<IPoolForm>();
  const [poolFarmOptionView, setPFarmoolOptionView] = useState<PoolFarmsOption>(
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
      <Box display="flex" justifyContent="flex-end">
        <Tabs
          type="circle"
          onChangeTab={setPFarmoolOptionView}
          items={['Stake', 'Unstake']}
          defaultTabIndex={poolFarmOptionView}
        />
      </Box>
      <Box gridColumn="1/-1">
        <PoolFormActive
          isStakeForm={poolFarmOptionView === PoolFarmsOption.Stake}
        />
      </Box>
    </>
  );
};

export default FarmForm;
