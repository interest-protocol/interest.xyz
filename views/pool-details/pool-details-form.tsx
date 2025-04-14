import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import FarmForm from './farm-form';
import PoolForm from './pool-form';

const PoolDetailsForm: FC = () => {
  const [mode, setMode] = useState<number>(0);

  return (
    <Box
      gap="xl"
      bg="container"
      display="grid"
      borderRadius="xs"
      color="onSurface"
      flexDirection="column"
      p={['m', 'm', 'm', 'xl']}
      gridTemplateColumns="1fr 1fr"
    >
      <Tabs
        type="circle"
        onChangeTab={setMode}
        defaultTabIndex={mode}
        items={['Liquidity', 'Farm']}
      />
      {[<PoolForm key={v4()} />, <FarmForm key={v4()} />][mode]}
    </Box>
  );
};

export default PoolDetailsForm;
