import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import CellText from '@/components/layout/cell-text';
import ExternalLink from '@/components/svg/external-link';

import { TableRowOrdersProps } from '../../table-row-orders.types';

const TableRowMobile: FC<TableRowOrdersProps> = ({
  id,
  from,
  to,
  fromIcon,
  rate,
  toIcon,
  total,
  date,
}) => (
  <Link href={`dca/orders/${id}`}>
    <Box p="m" display="flex" flexDirection="column" gap="0.25rem">
      <Box display="flex" gap="0.5rem">
        <CellText color="#FFFFFF">From:</CellText>
        <Box display="flex" gap="0.5rem">
          <img
            width={20}
            height={20}
            alt={fromIcon}
            src={fromIcon}
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
          <CellText color="#FFFFFF">{from}</CellText>
        </Box>
      </Box>
      <Box display="flex" gap="0.5rem">
        <CellText color="#FFFFFF">Rate:</CellText>
        <CellText color="#FFFFFF">{rate}</CellText>
      </Box>
      <Box display="flex" gap="0.5rem">
        <CellText color="#FFFFFF">To:</CellText>
        <Box display="flex" gap="0.5rem">
          <img
            width={20}
            height={20}
            alt={toIcon}
            src={toIcon}
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
          <CellText color="#FFFFFF">{to}</CellText>
        </Box>
      </Box>
      <Box display="flex" gap="0.5rem">
        <CellText color="#FFFFFF">Total in USD:</CellText>
        <CellText color="#FFFFFF">{total}</CellText>
      </Box>
      <Box display="flex" gap="0.5rem">
        <CellText color="#FFFFFF">Date:</CellText>
        <CellText color="#FFFFFF">{date}</CellText>
      </Box>
      <ExternalLink
        width="100%"
        color="#9CA3AF"
        maxWidth="0.625rem"
        maxHeight="0.625rem"
      />
    </Box>
  </Link>
);

export default TableRowMobile;
