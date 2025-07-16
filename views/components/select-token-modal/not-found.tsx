import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { NoSearchSVG } from '@/components/svg';

const NotFound: FC = () => (
  <Box
    py="2rem"
    gap="xl"
    flex="1"
    color="#E2E2E6"
    display="flex"
    overflowY="auto"
    gridColumn="1/-1"
    alignItems="center"
    flexDirection="column"
  >
    <NoSearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
    <Typography
      size="medium"
      variant="body"
      fontWeight="700"
      fontSize="1rem"
      fontFamily="Inter"
    >
      No tokens found
    </Typography>
    <Typography
      size="medium"
      variant="body"
      color="#9CA3AF"
      fontWeight="700"
      fontFamily="Inter"
      fontSize="0.875rem"
    >
      We couldn&#39;t find any tokens matching your criteria.
    </Typography>
  </Box>
);

export default NotFound;
