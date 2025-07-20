import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import RefreshSVG from '@/components/svg/refresh';
import Tabs from '@/components/tabs';
import { useTabState } from '@/hooks/use-tab-manager';

const OrdersTabs: FC = () => {
  const { tab, setTab } = useTabState();
  const tabsOrders = ['Active Orders', 'Previous Orders'];

  return (
    <Box
      gap="1rem"
      mb="1.5rem"
      display="flex"
      justifyContent="space-between"
      flexDirection={['column', 'row']}
    >
      <Tabs tabs={tabsOrders} setTab={setTab} tab={tab} />

      <Button
        px="1.5rem"
        display="flex"
        fontSize="1rem"
        color="#002A78"
        fontWeight="600"
        variant="filled"
        maxWidth="8.5rem"
        fontFamily="Inter"
        alignItems="center"
        justifyContent="center"
        borderRadius="0.75rem"
      >
        Refresh
        <RefreshSVG width="100%" maxWidth="0.84rem" maxHeight="0.84rem" />
      </Button>
    </Box>
  );
};

export default OrdersTabs;
