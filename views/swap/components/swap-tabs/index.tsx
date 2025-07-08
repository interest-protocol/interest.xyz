import { FC } from 'react';

import Tabs from '@/components/tabs';
import { useTabState } from '@/hooks/use-tab-manager';

const SwapTabs: FC = () => {
  const { tab, setTab } = useTabState();
  const tabs = ['Swap', 'Bridge'];

  return <Tabs tabs={tabs} setTab={setTab} tab={tab} />;
};

export default SwapTabs;
