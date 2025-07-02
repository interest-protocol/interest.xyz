import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

export const MaxBadge: FC = () => (
  <Box
    bg="#9CA3AF1A"
    padding="2px 6px"
    borderRadius="0.75rem"
    border="2px solid #9CA3AF1A"
  >
    <Typography
      size="small"
      variant="body"
      fontSize="s"
      whiteSpace="nowrap"
      fontWeight="500"
      fontFamily="Inter"
      lineHeight="1"
    >
      Max
    </Typography>
  </Box>
);
