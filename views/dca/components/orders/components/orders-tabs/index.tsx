import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Tabs from '@/components/tabs';
import { useTabState } from '@/hooks/use-tab-manager';

const OrdersTabs: FC = () => {
  const { tab, setTab } = useTabState();
  const tabsOrders = ['Active Orders', 'Previous Orders'];

  return (
    <Box
      display="flex"
      mb="0.75rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Tabs tabs={tabsOrders} setTab={setTab} tab={tab} />
      <Box
        role="button"
        lineHeight="0"
        display="flex"
        cursor="pointer"
        color="onSurface"
        alignItems="center"
        aria-label="Settings"
        transition="transform 500ms ease-in-out"
        nHover={{ transform: 'rotate(180deg)' }}
      >
        <Button
          py="1.5rem"
          px="1.5rem"
          fontSize="1rem"
          color="#002A78"
          fontWeight="600"
          variant="filled"
          fontFamily="Inter"
          borderRadius="0.75rem"
        >
          Refresh
        </Button>
      </Box>
    </Box>
  );
};

export default OrdersTabs;
