import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { DollarSVG } from '@/components/svg';

import { HeaderInfoCardProps } from './header.types';

const HeaderInfoLine: FC<Omit<HeaderInfoCardProps, 'type'>> = ({
  title,
  value,
  Button,
  isLoading,
}) => {
  return (
    <Box
      px="m"
      py="m"
      gap="m"
      width="100%"
      bg="container"
      overflowX="auto"
      borderRadius="xs"
      color={'onSurface'}
      display="flex"
      alignItems="center"
      flexDirection="column"
      aria-label="info-card"
      justifyContent="space-between"
    >
      <Box
        gap="m"
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection={Button ? ['row', 'row', 'row', 'row'] : 'row'}
        justifyContent="space-between"
      >
        <Box display="flex">
          <Typography mr="m" variant="label" size="large">
            {title}
          </Typography>
          <Typography as="span" variant="label" size="large" color="primary">
            {isLoading ? <Skeleton width="4rem" /> : value}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {Button ? (
            Button
          ) : (
            <Box
              bg="surface"
              padding="2xs"
              width="1.7rem"
              display="flex"
              height="1.7rem"
              minWidth="1.7rem"
              minHeight="1.7rem"
              borderRadius="50%"
              alignItems="center"
              justifyContent="center"
              aria-label="info-card-icon"
              color="primary"
            >
              <DollarSVG
                maxHeight="100%"
                maxWidth="100%"
                width="100%"
                key={v4()}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderInfoLine;
