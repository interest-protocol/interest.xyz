import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PoolFarmsOption } from '../../pool-details.types';
import PoolField from '../pool-field';
import { PoolFormProps } from '../pool-field/pool-field.types';
import WithdrawManager from './pool-form-withdraw-manager';
import Selection from './pool-form-withdraw-receive';
import PoolPreviewFormWithdrawButton from './pool-preview-form-withdraw-button';

const PoolFormFarms: FC<PoolFormProps> = ({ poolOptionView }) => (
  <>
    <Typography size="large" variant="title" fontSize="2xl">
      I would like to{' '}
      {poolOptionView == PoolFarmsOption.Stake ? 'Stake' : 'Unstake'}
      ...
    </Typography>
    <Box display="flex" flexDirection="column" gap="m">
      <PoolField index={0} poolOptionView={PoolFarmsOption.Unstake} />
      <Selection />
    </Box>
    <WithdrawManager />
    <PoolPreviewFormWithdrawButton />
  </>
);

export default PoolFormFarms;
