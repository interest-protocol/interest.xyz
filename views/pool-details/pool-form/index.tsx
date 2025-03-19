import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm, PoolOption } from '@/views/pools/pools.types';

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
    <Box
      gap="xl"
      bg="container"
      display="flex"
      borderRadius="xs"
      color="onSurface"
      flexDirection="column"
      p={['m', 'm', 'm', 'xl']}
    >
      <Box overflowX="auto">
        <Tabs
          type="circle"
          onChangeTab={setPoolOptionView}
          items={['Deposit', 'Withdraw']}
          defaultTabIndex={poolOptionView}
        />
      </Box>
      <PoolFormActive isDepositForm={poolOptionView === PoolOption.Deposit} />
    </Box>
  );
};
export default PoolForm;
