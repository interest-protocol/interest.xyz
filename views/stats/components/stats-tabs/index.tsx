import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Tabs from '@/components/tabs';
import { useTabState } from '@/hooks/use-tab-manager';

const StatsTabs: FC = () => {
  const { tab, setTab } = useTabState();
  const tabs = ['Tokens', 'Pools', 'Transitions'];

  return (
    <Box
      width="100%"
      gap="1rem"
      mb="0.75rem"
      display="flex"
      justifyContent="space-between"
      flexDirection={['column', 'row']}
    >
      <Tabs tabs={tabs} setTab={setTab} tab={tab} />
      <Box display="flex" gap="0.5rem">
        asasasasasa
      </Box>
    </Box>
  );
};

export default StatsTabs;
