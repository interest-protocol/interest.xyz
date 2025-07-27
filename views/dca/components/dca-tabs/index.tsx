import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Tabs from '@/components/tabs';
import { useTabState } from '@/hooks/use-tab-manager';

import StatusBtn from '../status-btn';

const DCATabs: FC = () => {
  const { tab, setTab } = useTabState();
  const tabs = ['Trade', 'Orders'];

  return (
    <Box
      gap="1rem"
      mb="0.75rem"
      display="flex"
      justifyContent="space-between"
      flexDirection={['column', 'row']}
    >
      <Tabs tabs={tabs} setTab={setTab} tab={tab} />
      <Box display="flex" gap="0.5rem">
        <StatusBtn status="complete" />
        <StatusBtn status="in-progress" />
        <StatusBtn status="canceled" />
      </Box>
    </Box>
  );
};

export default DCATabs;
