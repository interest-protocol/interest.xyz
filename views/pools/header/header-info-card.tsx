import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { DollarSVG, PercentageSVG, VolumeSVG } from '@/components/svg';
import { formatDollars, formatMoney } from '@/utils';

import { HeaderInfoCardProps, PoolHeaderIconEnum } from './header.types';

const HeaderInfoCard: FC<HeaderInfoCardProps> = ({
  type,
  title,
  value,
  isLoading,
}) => {
  const ICON = [
    <VolumeSVG maxHeight="100%" maxWidth="100%" width="100%" key={v4()} />,
    <DollarSVG maxHeight="100%" maxWidth="100%" width="100%" key={v4()} />,
    <PercentageSVG maxHeight="100%" maxWidth="100%" width="100%" key={v4()} />,
  ];

  return (
    <Box
      px="m"
      py="xl"
      gap="m"
      width="100%"
      bg="container"
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
          {ICON[type]}
        </Box>
      </Box>
      <Typography size="large" lineHeight="l" variant="title" color="#000000A3">
        <Typography as="span" variant="label" size="large" color="primary">
          {isLoading ? (
            <Skeleton width="50%" />
          ) : type == PoolHeaderIconEnum.apr ? (
            isNaN(+value) ? (
              '0.00 %'
            ) : (
              formatMoney(+value, 2) + ' %'
            )
          ) : isNaN(+value) ? (
            '0.00 $'
          ) : (
            formatDollars(+value, 2)
          )}
        </Typography>
      </Typography>
    </Box>
  );
};

export default HeaderInfoCard;
