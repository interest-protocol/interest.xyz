import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import LpCoinField from './fields/lp-coin';
import TokenListFields from './fields/token-list';
import { PoolPreviewProps } from './preview.types';
import PoolPreviewWrapper from './wrapper';

const PoolPreview: FC<PoolPreviewProps> = ({
  onSubmit,
  getValues,
  isDeposit,
}) => {
  return (
    <PoolPreviewWrapper
      onSubmit={onSubmit}
      isDeposit={isDeposit}
      getValues={getValues}
    >
      <Box display="flex" flexDirection="column" gap="2xl">
        <Box display="flex" flexDirection="column" gap="xs">
          <Typography variant="label" size="small" textTransform="uppercase">
            {`You will ${isDeposit ? 'deposit' : 'withdraw'}`}
          </Typography>
          {isDeposit ? (
            <TokenListFields getValues={getValues} />
          ) : (
            <LpCoinField getValues={getValues} />
          )}
        </Box>
        <Box display="flex" flexDirection="column" gap="xs">
          <Typography variant="label" size="small" textTransform="uppercase">
            You will receive (estimated):
          </Typography>
          {!isDeposit ? (
            <TokenListFields getValues={getValues} />
          ) : (
            <LpCoinField getValues={getValues} />
          )}
        </Box>
      </Box>
    </PoolPreviewWrapper>
  );
};
export default PoolPreview;
