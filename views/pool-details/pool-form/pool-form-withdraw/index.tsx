import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolField from '../pool-field';
import { PoolFormProps } from '../pool-field/pool-field.types';
import WithdrawManager from './pool-form-withdraw-manager';
import Selection from './pool-form-withdraw-receive';
import PoolPreviewFormWithdrawButton from './pool-preview-form-withdraw-button';

const PoolFormWithdraw: FC<PoolFormProps> = ({ poolOptionView }) => (
  <>
    <Box display="flex" flexDirection="column" gap="m">
      <PoolField index={0} poolOptionView={poolOptionView} />
      <Selection />
    </Box>
    <WithdrawManager />
    <PoolPreviewFormWithdrawButton />
  </>
);

export default PoolFormWithdraw;
