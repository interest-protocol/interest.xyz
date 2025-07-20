import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import TableRecentDCA from './components/table-recent-dca';

const RecentDCA: FC = () => (
  <Box
    p="1.5rem"
    gap="1rem"
    mt="1.5rem"
    bg="#9CA3AF1A"
    display="flex"
    flexDirection="column"
    borderRadius="0.75rem"
    width={['100%', '100%', '100%', '49.4%']}
  >
    <Box
      display="flex"
      mb="0.75rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        size="medium"
        variant="title"
        color="#FFFFFF"
        fontWeight="600"
        fontSize="1.125rem"
      >
        Recent DCA
      </Typography>

      <Typography
        size="medium"
        variant="title"
        color="#B4C5FF"
        fontWeight="500"
        fontFamily="Inter"
        fontSize="0.875rem"
      >
        View all
      </Typography>
    </Box>

    <TableRecentDCA />
  </Box>
);

export default RecentDCA;
