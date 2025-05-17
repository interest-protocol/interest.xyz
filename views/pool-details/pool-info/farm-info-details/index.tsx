import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Accordion from '../components/accordion';
import { FARM_INFORMATION } from '../pool-info.data';
import FarmInfoDetailsPool from './farm-info-details-pool';

const FarmDetail: FC = () => (
  <Box>
    <Accordion title={FARM_INFORMATION.title} noBorder>
      <FarmInfoDetailsPool />
    </Accordion>
  </Box>
);

export default FarmDetail;
