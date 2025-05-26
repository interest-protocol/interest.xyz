import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PoolCardTradeTooltipItemProps } from './pool-card.types';

const PoolCardTradeTooltipItem: FC<PoolCardTradeTooltipItemProps> = ({
  value,
  label,
}) => (
  <Box py="xs" display="flex" justifyContent="space-between" color="#1A1D21">
    <Typography
      size="medium"
      color="#1A1D21"
      variant="body"
      textTransform="capitalize"
    >
      {label}:
    </Typography>
    <Box display="flex" gap="xs" alignItems="center" pl="xs">
      <Typography size="medium" variant="body" color="#011b2a">
        {value}
      </Typography>
    </Box>
  </Box>
);

export default PoolCardTradeTooltipItem;
