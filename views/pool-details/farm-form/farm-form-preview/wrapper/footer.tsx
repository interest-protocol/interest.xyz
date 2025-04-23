import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolCardTrade from '@/views/pools/pool-card/pool-card-trade';

import { FarmPreviewWrapperProps } from '../preview.types';

const FarmPreviewWrapperFooter: FC<FarmPreviewWrapperProps> = ({
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

export default FarmPreviewWrapperFooter;
