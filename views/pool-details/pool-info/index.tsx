import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { PoolDetailsTabOption } from '../pool-details.types';
import DetailTabs from './components/detail-tabs';
import PoolInfoDetail from './pool-info-details';

const PoolInfo: FC = () => {
  const [poolDetailsView, setPoolDetailsView] = useState<PoolDetailsTabOption>(
    PoolDetailsTabOption.Detail
  );

  return (
    <Box color="onSurface" borderRadius="xs" bg="container">
      <DetailTabs
        items={['Pool Detail']}
        onChangeTab={setPoolDetailsView}
        defaultTabIndex={poolDetailsView}
      />
      {poolDetailsView === PoolDetailsTabOption.Detail && <PoolInfoDetail />}
    </Box>
  );
};

export default PoolInfo;
