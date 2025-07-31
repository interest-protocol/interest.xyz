import { Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { MaxBadgeProps } from './input.types';

export const MaxBadge: FC<MaxBadgeProps> = ({ handleMax }) => (
  <Button
    bg="#9CA3AF1A"
    p="2px 6px"
    borderRadius="0.75rem"
    border="2px solid #9CA3AF1A"
    color="outline"
    variant="outline"
    onClick={handleMax}
    nHover={{ bg: 'unset', borderColor: 'primary' }}
  >
    <Typography
      size="small"
      variant="body"
      fontSize="0.75rem"
      whiteSpace="nowrap"
      fontWeight="500"
      fontFamily="Inter"
      lineHeight="1rem"
    >
      Max
    </Typography>
  </Button>
);
