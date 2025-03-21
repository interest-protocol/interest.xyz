import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ExclamationCircleSVG, QuestionCircleSVG } from '@/components/svg';

import { InfoCardTradeProps } from './info-card.types';

const InfoCardTrade: FC<InfoCardTradeProps> = ({
  amount,
  isInfo,
  loading,
  noBorder,
  tooltipInfo,
  description,
}) => (
  <Box
    py="xs"
    display="flex"
    borderTop="1px solid"
    justifyContent="space-between"
    borderColor={noBorder ? 'transparent' : 'outlineVariant'}
  >
    <Typography
      size="medium"
      color="outline"
      variant="body"
      textTransform="capitalize"
    >
      {description}
    </Typography>
    <Box display="flex" gap="xs" alignItems="center">
      <Typography color="onSurface" size="medium" variant="body">
        {loading ? <Skeleton width="5rem" /> : amount}
      </Typography>
      <TooltipWrapper
        bg="onSurface"
        tooltipPosition="left"
        tooltipContent={
          <Typography variant="body" size="medium" color="surface">
            {tooltipInfo}
          </Typography>
        }
      >
        <Box color="onSurface">
          {isInfo ? (
            <ExclamationCircleSVG
              width="100%"
              maxWidth="1rem"
              maxHeight="1rem"
            />
          ) : (
            <QuestionCircleSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          )}
        </Box>
      </TooltipWrapper>
    </Box>
  </Box>
);

export default InfoCardTrade;
