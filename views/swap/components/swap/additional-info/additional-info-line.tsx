import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { AdditionalInfoLineProps } from './additional-info.types';

const AdditionalInfoLine: FC<AdditionalInfoLineProps> = ({
  title,
  flag,
  value,
}) => (
  <Box display="flex" justifyContent="space-between">
    <Typography
      variant="body"
      size="small"
      fontWeight="500"
      fontSize="0.875rem"
      lineHeight="1.125rem"
      fontFamily="Inter"
      letterSpacing="-0.035rem"
      color="#B8C4C4"
    >
      {title}
    </Typography>
    <Box gap="0.5rem" display="flex" cursor="pointer" alignItems="center">
      {flag && (
        <Typography
          size="small"
          variant="body"
          fontSize="0.75rem"
          whiteSpace="nowrap"
          fontWeight="500"
          fontFamily="Inter"
          lineHeight="1rem"
          color="#9CA3AF"
          bg="#9CA3AF1A"
          p="2px 6px"
          borderRadius="0.75rem"
          border="2px solid #9CA3AF1A"
        >
          {flag}
        </Typography>
      )}
      <Typography
        variant="body"
        size="small"
        fontWeight="500"
        fontSize="0.875rem"
        lineHeight="1.125rem"
        fontFamily="Inter"
        letterSpacing="-0.035rem"
        color="#FFFFFF"
      >
        {value}
      </Typography>
    </Box>
  </Box>
);

export default AdditionalInfoLine;
