import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { IPoolForm } from '@/views/pools/pools.types';

import PoolField from '../pool-field';
import { PoolFormProps } from '../pool-field/pool-field.types';
import TokenFieldSkeleton from '../token-field-skeleton';
import DepositManager from './pool-form-deposit-manager';
import PoolReceiveSection from './pool-form-deposit-receive';
import PoolPreviewFormDepositButton from './pool-preview-form-deposit-button';

const PoolDeposit: FC<PoolFormProps> = ({ poolOptionView }) => {
  const { control } = useFormContext<IPoolForm>();

  const { fields } = useFieldArray({ control, name: 'tokenList' });

  return (
    <>
      <Box display="flex" flexDirection="column" gap="m">
        {fields.length
          ? fields.map(({ id }, index) => (
              <PoolField
                key={id}
                index={index}
                poolOptionView={poolOptionView}
              />
            ))
          : [1, 2].map(() => <TokenFieldSkeleton key={v4()} isDepositForm />)}
      </Box>
      <PoolReceiveSection />
      <DepositManager />
      <PoolPreviewFormDepositButton />
    </>
  );
};

export default PoolDeposit;
