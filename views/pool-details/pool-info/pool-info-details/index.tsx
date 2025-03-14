import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Accordion from '../components/accordion';
import { POOL_INFORMATION, POOL_STATISTICS } from '../pool-info.data';
import PoolInfoDetailsBalance from './pool-info-details-balance';
import PoolInfoDetailsPool from './pool-info-details-pool';
import PoolInfoDetailsStats from './pool-info-details-stats';

const PoolDetails: FC = () => (
  <Box>
    <Accordion title={POOL_INFORMATION.title}>
      <PoolInfoDetailsPool />
    </Accordion>
    <Accordion title="Live balance">
      <PoolInfoDetailsBalance />
    </Accordion>
    <Accordion title={POOL_STATISTICS.title} noBorder>
      <PoolInfoDetailsStats />
    </Accordion>
  </Box>
);

export default PoolDetails;
