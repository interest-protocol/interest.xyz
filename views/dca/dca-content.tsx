import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useTabState } from '@/hooks/use-tab-manager';

import DCATabs from './components/dca-tabs';
import Orders from './components/orders';
import Trade from './components/trade';

const DCAContent: FC = () => {
  const { tab } = useTabState();

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      px={['0rem', '2.5rem']}
    >
      <DCATabs />
      {[<Trade key={v4()} />, <Orders key={v4()} />][tab]}
    </Box>
  );
};

export default DCAContent;
