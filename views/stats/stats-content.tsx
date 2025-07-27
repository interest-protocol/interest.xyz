import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useTabState } from '@/hooks/use-tab-manager';

import Pools from './components/pools';
import StatsTabs from './components/stats-tabs';
import Tokens from './components/tokens';
import Transactions from './components/transations';

const StatsContent: FC = () => {
  const { tab } = useTabState();

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      px={['0rem', '2.5rem']}
    >
      <StatsTabs />
      {
        [
          <Tokens key={v4()} />,
          <Pools key={v4()} />,
          <Transactions key={v4()} />,
        ][tab]
      }
    </Box>
  );
};

export default StatsContent;
