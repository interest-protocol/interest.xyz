import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { PoolOption } from '../pool-details.types';
import { PoolFormActiveProps } from './pool-form.types';
import PoolDeposit from './pool-form-deposit';
import PoolWithdraw from './pool-form-withdraw';
import SyncButton from './sync-button';

const PoolFormActive: FC<PoolFormActiveProps> = ({ isDepositForm }) => {
  if (isDepositForm) return <PoolDeposit poolOptionView={PoolOption.Deposit} />;
  return <PoolWithdraw poolOptionView={PoolOption.Withdraw} />;
};

const PoolForm: FC = () => {
  const { setValue } = useFormContext<IPoolForm>();
  const [poolOptionView, setPoolOptionView] = useState<PoolOption>(
    PoolOption.Deposit
  );

  const cleanField = () => {
    setValue('lpCoin.value', '');
    setValue('tokenList.0.value', '');
    setValue('tokenList.1.value', '');
    setValue('syncBalances', false);
    setValue('lpCoin.valueBN', ZERO_BIG_NUMBER);
    setValue('tokenList.0.valueBN', ZERO_BIG_NUMBER);
    setValue('tokenList.1.valueBN', ZERO_BIG_NUMBER);
  };

  const handleTabChange = (tabIndex: number): void => {
    cleanField();
    setPoolOptionView(tabIndex);
  };

  useEffect(() => {
    cleanField();
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent={['center', 'space-between']}
        alignItems="center"
        gap="m"
        flexDirection={[
          'column-reverse',
          'column-reverse',
          'column-reverse',
          'row',
        ]}
        mx={['auto', 'auto', 'auto', 'unset']}
      >
        <Tabs
          type="circle"
          onChangeTab={handleTabChange}
          items={['Deposit', 'Withdraw']}
          defaultTabIndex={poolOptionView}
        />
        {poolOptionView === PoolOption.Deposit && <SyncButton />}
      </Box>
      <Box gridColumn="1/-1">
        <PoolFormActive isDepositForm={poolOptionView === PoolOption.Deposit} />
      </Box>
    </>
  );
};

export default PoolForm;
