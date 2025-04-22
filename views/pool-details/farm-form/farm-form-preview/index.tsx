import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import LpCoinField from './fields/lp-coin';
import { FarmPreviewProps } from './preview.types';
import PoolPreviewWrapper from './wrapper';

const FarmPreview: FC<FarmPreviewProps> = ({
  isStake,
  onSubmit,
  getValues,
}) => (
  <PoolPreviewWrapper
    onSubmit={onSubmit}
    isDeposit={isStake}
    getValues={getValues}
  >
    <Box display="flex" flexDirection="column" gap="2xl">
      <Box display="flex" flexDirection="column" gap="xs">
        <Typography variant="label" size="small" textTransform="uppercase">
          {`You will ${isStake ? 'stake' : 'unstake'}`}
        </Typography>
        <LpCoinField getValues={getValues} />
      </Box>
    </Box>
  </PoolPreviewWrapper>
);

export default FarmPreview;
