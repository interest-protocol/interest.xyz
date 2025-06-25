import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { PoolFarmsOption } from '../pool-details.types';
import PoolFormFarms from './farm-form-stake';
import FarmFormAPR from './farm-rewards/farm-form-apr';

const FarmForm: FC = () => {
  const { setValue } = useFormContext<IPoolForm>();
  const [poolFarmOptionView, setFarmOptionView] = useState<PoolFarmsOption>(
    PoolFarmsOption.Stake
  );

  useEffect(() => {
    setValue('lpCoin.value', '0');
    setValue('tokenList.0.value', '0');
    setValue('tokenList.1.value', '0');
    setValue('lpCoin.valueBN', ZERO_BIG_NUMBER);
    setValue('tokenList.0.valueBN', ZERO_BIG_NUMBER);
    setValue('tokenList.1.valueBN', ZERO_BIG_NUMBER);
  }, [poolFarmOptionView]);

  return (
    <>
      <Box
        gap="m"
        display="flex"
        flexWrap={['wrap-reverse', 'unset']}
        justifyContent={['center', 'space-between']}
      >
        <Tabs
          type="circle"
          onChangeTab={setFarmOptionView}
          items={['Stake', 'Unstake']}
          defaultTabIndex={poolFarmOptionView}
        />
        <FarmFormAPR />
      </Box>
      <Box gridColumn="1/-1">
        <PoolFormFarms farmMode={poolFarmOptionView} />
      </Box>
    </>
  );
};

export default FarmForm;
