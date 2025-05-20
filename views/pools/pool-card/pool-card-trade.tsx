import { Box, TooltipWrapper, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ExclamationCircleSVG, QuestionCircleSVG } from '@/components/svg';

import { PoolCardTradeProps } from './pool-card.types';
import PoolCardTradeTooltipList from './pool-card-trade-tooltip-item copy';

const PoolCardTrade: FC<PoolCardTradeProps> = ({
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
    <Box
      gap="xs"
      display="flex"
      alignItems="center"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Typography color="onSurface" size="medium" variant="body">
        {loading ? <Skeleton width="5rem" /> : amount}
      </Typography>
      <TooltipWrapper
        bg="onSurface"
        borderRadius="0.5rem"
        width="max-content"
        tooltipPosition="left"
        tooltipContent={
          typeof tooltipInfo === 'string' ? (
            <Typography variant="body" size="medium" color="surface">
              {tooltipInfo}
            </Typography>
          ) : (
            <PoolCardTradeTooltipList tooltipList={tooltipInfo} />
          )
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

export default PoolCardTrade;
