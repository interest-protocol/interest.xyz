import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import RecentDCA from './recent-dca';
import TradeDCA from './trade-dca';

const Trade: FC = () => (
  <Box
    gap="1rem"
    minWidth="100%"
    display="flex"
    flexWrap="wrap"
    alignItems="stretch"
    justifyContent="space-between"
    flexDirection={['column', 'row']}
  >
    <TradeDCA />
    <RecentDCA />
  </Box>
);

export default Trade;
