import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import DCAContent from './dca-content';

const DCA: FC = () => (
  <Layout>
    <Box height="100%" display="flex" flexDirection="column">
      <Typography
        mb="1.5rem"
        size="medium"
        variant="title"
        color="#FFFFFF"
        fontWeight="600"
        fontSize="1.75rem"
      >
        DCA
      </Typography>
      <DCAContent />
    </Box>
  </Layout>
);

export default DCA;
