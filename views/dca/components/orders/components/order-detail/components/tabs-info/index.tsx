import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ArrowRight from '@/components/svg/arrow-right';
import Tabs from '@/components/tabs';
import { useTabState } from '@/hooks/use-tab-manager';

const TabsInfo: FC = () => {
  const { tab, setTab } = useTabState();
  const tabs = ['Overview', 'Orders'];

  return (
    <Box
      display="flex"
      mb="0.75rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Tabs tabs={tabs} setTab={setTab} tab={tab} />

      <Box display="flex" alignItems="center" gap="0.5rem">
        <img
          alt="USDT"
          width={32}
          height={32}
          src={'/android-icon-48x48.png'}
          style={{ borderRadius: '50%' }}
        />
        <Typography
          size="medium"
          variant="label"
          color="#FFFFFF"
          fontFamily="Inter"
        >
          USDT
        </Typography>
        <ArrowRight
          width="100%"
          color="#9CA3AF"
          maxWidth="1.25rem"
          maxHeight="1.25rem"
        />
        <img
          alt="img"
          width={32}
          height={32}
          src={'/android-icon-48x48.png'}
          style={{ borderRadius: '50%' }}
        />
        <Typography
          size="medium"
          variant="label"
          color="#FFFFFF"
          fontFamily="Inter"
        >
          USDT
        </Typography>
      </Box>
    </Box>
  );
};

export default TabsInfo;
