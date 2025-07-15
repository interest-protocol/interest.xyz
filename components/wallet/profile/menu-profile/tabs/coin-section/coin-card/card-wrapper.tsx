import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { CardWrapperProps } from '../../../user-info.types';

const CardWrapper: FC<PropsWithChildren<CardWrapperProps>> = ({
  TokenIcon,
  symbol,
  supportingText,
  children,
}) => {
  return (
    <Box
      p="0.5rem"
      display="flex"
      bg="#222222"
      borderRadius="1rem"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box gap="s" display="flex" alignItems="center">
        {TokenIcon}
        <Box
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            size="small"
            variant="body"
            lineHeight="1rem"
            fontFamily="Inter"
            fontSize="0.875rem"
            color="#fff"
          >
            {symbol}
          </Typography>
          <Typography
            mt="0.15rem"
            color="#fff"
            size="small"
            variant="body"
            fontWeight="400"
            lineHeight="1rem"
            fontSize="0.75rem"
            fontFamily="Inter"
          >
            {supportingText}
          </Typography>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default CardWrapper;
