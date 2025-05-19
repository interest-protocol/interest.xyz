import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { DollarSVG, VolumeSVG } from '@/components/svg';
import { formatDollars } from '@/utils';

import { HeaderInfoCardProps } from './header.types';

const HeaderInfoCard: FC<HeaderInfoCardProps> = ({
  title,
  value,
  isVolume,
  isLoading,
}) => {
  return (
    <Box
      px="m"
      py="xl"
      gap="m"
      width="100%"
      bg="#1A1D21"
      minWidth="6rem"
      borderRadius="xs"
      overflowX="auto"
      display="inline-flex"
      flexDirection="column"
      justifyContent="space-between"
      color={'onSurface'}
      aria-label="info-card"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography mr="m" variant="label" size="large">
          {title}
        </Typography>
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
          {isVolume ? (
            <VolumeSVG maxHeight="100%" maxWidth="100%" width="100%" />
          ) : (
            <DollarSVG maxHeight="100%" maxWidth="100%" width="100%" />
          )}
        </Box>
      </Box>
      <Typography size="large" lineHeight="l" variant="title" color="#000000A3">
        <Typography as="span" variant="label" size="large" color="primary">
          {isLoading ? <Skeleton width="50%" /> : formatDollars(+value, 2)}
        </Typography>
      </Typography>
    </Box>
  );
};

export default HeaderInfoCard;
