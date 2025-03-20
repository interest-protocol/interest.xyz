import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolCreateButton from '../pool-next-button';
import SelectAlgorithmCard from './select-algorithm-card';

const SelectAlgorithm: FC = () => (
  <Box display="flex" gap="2xl" flexDirection="column" my="2xl">
    <Box display="flex" justifyContent="center" gap="2xl">
      <SelectAlgorithmCard
        name="sr-amm"
        description="Brief description of what is Volatile pool, 2 line max"
      />
      <SelectAlgorithmCard
        name="clamm"
        description="Brief description of what is Volatile pool, 2 line max"
      />
    </Box>
    <PoolCreateButton />
  </Box>
);

export default SelectAlgorithm;
