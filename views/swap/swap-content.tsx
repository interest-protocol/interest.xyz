import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useTabState } from '@/hooks/use-tab-manager';

import Bridge from './components/bridge';
import Swap from './components/swap';
import SwapTabs from './components/swap-tabs';

const SwapContent: FC = () => {
  const { tab } = useTabState();

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box
        gap="l"
        mx="auto"
        display="flex"
        borderRadius="l"
        alignContent="center"
        flexDirection="column"
        justifyContent="center"
        px={['2xs', 'xl', 'xl', '7xl']}
        width={['100%', '100%', '100%', '39.75rem']}
      >
        <SwapTabs />
        {[<Swap key={v4()} />, <Bridge key={v4()} />][tab]}
      </Box>
    </Box>
  );
};
export default SwapContent;
