import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolCreateButton from '../pool-next-button';
import SelectCurveCard from './select-curve-card';

const SelectCurve: FC = () => (
  <Box display="flex" gap="2xl" flexDirection="column" my="2xl">
    <Box display="flex" justifyContent="center" gap="2xl">
      <SelectCurveCard
        name="stable"
        description="Brief description of what is Volatile pool, 2 line max"
      />
      <SelectCurveCard
        name="volatile"
        description="Brief description of what is Volatile pool, 2 line max"
      />
    </Box>
    <PoolCreateButton />
  </Box>
);

export default SelectCurve;
