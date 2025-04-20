import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { PoolOption } from '../pool-details.types';
import PoolDeposit from './pool-form-deposit';
import PoolWithdraw from './pool-form-withdraw';

const PoolFormActive: FC<{ isDepositForm: boolean }> = ({ isDepositForm }) => {
  if (isDepositForm) return <PoolDeposit poolOptionView={PoolOption.Deposit} />;
  return <PoolWithdraw poolOptionView={PoolOption.Withdraw} />;
};

const PoolForm: FC = () => {
  const { setValue } = useFormContext<IPoolForm>();
  const [poolOptionView, setPoolOptionView] = useState<PoolOption>(
    PoolOption.Deposit
  );

  useEffect(() => {
    setValue('lpCoin.value', '');
    setValue('tokenList.0.value', '');
    setValue('tokenList.1.value', '');
    setValue('lpCoin.valueBN', ZERO_BIG_NUMBER);
    setValue('tokenList.0.valueBN', ZERO_BIG_NUMBER);
    setValue('tokenList.1.valueBN', ZERO_BIG_NUMBER);
  }, [poolOptionView]);

  return (
    <>
      <Box display="flex">
        <Tabs
          type="circle"
          onChangeTab={setPoolOptionView}
          items={['Deposit', 'Withdraw']}
          defaultTabIndex={poolOptionView}
        />
      </Box>
      <Box gridColumn="1/-1">
        <PoolFormActive isDepositForm={poolOptionView === PoolOption.Deposit} />
      </Box>
    </>
  );
};

export default PoolForm;
