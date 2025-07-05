import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Accordion from '../components/accordion';
import { POOL_INFORMATION } from '../pool-info.data';
import PoolInfoDetailsBalance from './pool-info-details-balance';
import PoolInfoDetailsMyPosition from './pool-info-details-my-position';
import PoolInfoDetailsPool from './pool-info-details-pool';
import PoolInfoDetailsStats from './pool-info-details-stats';

const PoolDetails: FC = () => {
  return (
    <Box>
      <Accordion title={POOL_INFORMATION.title}>
        <PoolInfoDetailsPool />
      </Accordion>
      <PoolInfoDetailsMyPosition />
      <PoolInfoDetailsBalance />
      <PoolInfoDetailsStats />
    </Box>
  );
};

export default PoolDetails;
