import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CardInfoProps } from './card-info.types';

const CardInfo: FC<CardInfoProps> = ({ width = '25.125rem', title }) => {
  return (
    <Box
      p="1rem"
      gap="1rem"
      display="flex"
      bg="#9CA3AF1A"
      maxHeight="11.5rem"
      flexDirection="column"
      borderRadius="0.75rem"
      border="1px solid #F3F4F61A"
      width={['100%', `${width}`]}
    >
      <Typography
        size="medium"
        variant="label"
        color="#FFFFFF"
        fontSize="1rem"
        fontWeight="600"
        fontFamily="Inter"
      >
        {title}
      </Typography>
      <Box width="100%" display="flex" justifyContent="space-between">
        <Typography
          size="medium"
          variant="label"
          color="#E5E7EB"
          fontWeight="400"
          fontFamily="Inter"
          fontSize="0.875rem"
        >
          Label
        </Typography>
        <Typography
          size="medium"
          variant="label"
          color="#FFFFFF"
          fontWeight="400"
          fontFamily="Inter"
          fontSize="0.875rem"
        >
          Info
        </Typography>
      </Box>
    </Box>
  );
};

export default CardInfo;
