import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import CellText from '@/components/layout/cell-text';
import ExternalLink from '@/components/svg/external-link';

import { TableRowOrdersProps } from '../../table-row-orders.types';

const TableRowDesktop: FC<TableRowOrdersProps> = ({
  id,
  from,
  to,
  fromIcon,
  toIcon,
  total,
  rate,
  date,
}) => (
  <Link href={`dca/orders/${id}`}>
    <Box
      gap="m"
      px="1rem"
      height="4rem"
      display="grid"
      alignItems="center"
      gridTemplateColumns="2fr 2fr 2fr 2fr 2fr 0.1fr"
    >
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
      <CellText color="#FFFFFF">{rate}</CellText>
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
      <CellText color="#FFFFFF">{total}</CellText>
      <CellText color="#FFFFFF">{date}</CellText>

      <ExternalLink
        width="100%"
        color="#9CA3AF"
        maxWidth="1rem"
        maxHeight="1rem"
      />
    </Box>
  </Link>
);

export default TableRowDesktop;
