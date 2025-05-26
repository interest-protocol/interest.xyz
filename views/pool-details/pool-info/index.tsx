import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import {
  PoolDetailsFormProps,
  PoolDetailsMode,
  PoolDetailsTabOption,
} from '../pool-details.types';
import DetailTabs from './components/detail-tabs';
import FarmDetail from './farm-info-details';
import PoolInfoDetail from './pool-info-details';

const PoolInfo: FC<PoolDetailsFormProps> = ({ mode }) => {
  const [poolDetailsView, setPoolDetailsView] = useState<PoolDetailsTabOption>(
    PoolDetailsTabOption.Detail
  );

  const isLiquidity = mode == PoolDetailsMode.Liquidity;

  return (
    <Box color="onSurface" borderRadius="xs" bg="container">
      <DetailTabs
        items={[isLiquidity ? 'Pool Detail' : 'Farm Details']}
        onChangeTab={setPoolDetailsView}
        defaultTabIndex={poolDetailsView}
      />
      {isLiquidity ? <PoolInfoDetail /> : <FarmDetail />}
    </Box>
  );
};

export default PoolInfo;
