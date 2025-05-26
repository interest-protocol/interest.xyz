import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { PoolCardTradeTooltipListProps } from './pool-card.types';
import PoolCardTradeTooltipItem from './pool-card-trade-tooltip-item';

const PoolCardTradeTooltipList: FC<PoolCardTradeTooltipListProps> = ({
  tooltipList,
}) => (
  <Box>
    {tooltipList.map((tooltip) => (
      <PoolCardTradeTooltipItem key={v4()} {...tooltip} />
    ))}
  </Box>
);

export default PoolCardTradeTooltipList;
