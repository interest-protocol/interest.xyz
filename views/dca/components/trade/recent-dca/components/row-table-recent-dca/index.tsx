import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import ArrowRight from '@/components/svg/arrow-right';

const RowTableRecentDCA: FC = ({
  from,
  to,
  amount,
  percentage,
  fromIcon,
  toIcon,
}: any) => (
  <Box
    px="1rem"
    width="100%"
    py="0.875rem"
    display="flex"
    alignItems="center"
    borderBottom="1px solid #1F2937"
    justifyContent="space-between"
  >
    <Box display="flex" alignItems="center" gap="0.5rem">
      <img
        alt={from}
        width={32}
        height={32}
        src={fromIcon}
        style={{ borderRadius: '50%' }}
      />
      <Typography
        size="medium"
        variant="label"
        color="#FFFFFF"
        fontFamily="Inter"
      >
        {from}
      </Typography>
      <ArrowRight
        width="100%"
        color="#9CA3AF"
        maxWidth="1.25rem"
        maxHeight="1.25rem"
      />
      <img
        alt={to}
        width={32}
        height={32}
        src={toIcon}
        style={{ borderRadius: '50%' }}
      />
      <Typography
        size="medium"
        variant="label"
        color="#FFFFFF"
        fontFamily="Inter"
      >
        {to}
      </Typography>
    </Box>

    <Typography
      size="medium"
      variant="label"
      color="#FFFFFF"
      fontWeight="400"
      fontFamily="Inter"
    >
      {amount}
    </Typography>

    <Box
      px="0.5rem"
      py="0.25rem"
      borderRadius="0.75rem"
      backgroundColor="#0053DB33"
    >
      <Typography
        size="small"
        variant="label"
        color="#5C9AFF"
        fontFamily="Inter"
        fontSize="0.625rem"
      >
        {percentage}
      </Typography>
    </Box>

    <Typography
      size="medium"
      variant="label"
      color="#B4C5FF"
      fontWeight="500"
      fontSize="0.75rem"
      fontFamily="Inter"
    >
      Details
    </Typography>
  </Box>
);

export default RowTableRecentDCA;
