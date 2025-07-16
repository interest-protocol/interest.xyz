import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import TradeDCA from './trade-dca';

const Trade: FC = () => (
  <Box gap="1rem" width="47%" display="flex">
    <TradeDCA />
  </Box>
);

export default Trade;
