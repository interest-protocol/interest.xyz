import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import SwapBackground from '../swap/swap-background';

const DCA: FC = () => (
  <Layout background={<SwapBackground />}>
    <Box height="100%" display="flex">
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
      ></Box>
    </Box>
  </Layout>
);

export default DCA;
