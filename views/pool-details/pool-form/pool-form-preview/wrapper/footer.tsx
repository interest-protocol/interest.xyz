import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolCardTrade from '@/views/pools/pool-v2-card/pool-card-trade';

import { PoolPreviewWrapperProps } from '../preview.types';

const PoolPreviewWrapperFooter: FC<PoolPreviewWrapperProps> = ({
  onSubmit,
  getValues,
}) => (
  <Box>
    <Box px="m" py="xs" bg="surface" borderRadius="1rem">
      <PoolCardTrade
        isInfo
        noBorder
        description="Slippage"
        tooltipInfo="Slippage Loss (incl. pricing)"
        amount={`${getValues('settings.slippage')}%`}
      />
      <PoolCardTrade
        isInfo
        noBorder
        description="Network Fee"
        tooltipInfo="Gas estimation"
        amount="--"
      />
    </Box>
    {onSubmit}
  </Box>
);

export default PoolPreviewWrapperFooter;
