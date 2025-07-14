import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ExclamationCircleSVG } from '@/components/svg';

const NoCoin: FC = () => (
  <Box
    gap="m"
    display="flex"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
  >
    <ExclamationCircleSVG
      width="1.25rem"
      height="1.25rem"
      maxHeight="100%"
      maxWidth="100%"
    />
    <Typography
      size="medium"
      variant="body"
      fontFamily="Inter"
      fontWeight="700"
      fontSize="1rem"
      lineHeight="1.5rem"
    >
      No tokens found
    </Typography>
    <Typography
      size="small"
      variant="body"
      color="#9CA3AF"
      fontWeight="400"
      fontSize="0.875rem"
      fontFamily="Inter"
      lineHeight="1.5rem"
      textAlign="center"
    >
      We couldn&apos;t find any tokens matching your criteria.
    </Typography>
  </Box>
);

export default NoCoin;
