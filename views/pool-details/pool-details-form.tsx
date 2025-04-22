import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import FarmForm from './farm-form';
import { PoolDetailsFormProps } from './pool-details.types';
import PoolForm from './pool-form';

const PoolDetailsForm: FC<PoolDetailsFormProps> = ({ mode }) => (
  <Box
    gap="xl"
    bg="container"
    display="grid"
    borderRadius="xs"
    color="onSurface"
    flexDirection="column"
    p={['m', 'm', 'm', 'xl']}
  >
    {[<PoolForm key={v4()} />, <FarmForm key={v4()} />][mode]}
  </Box>
);

export default PoolDetailsForm;
