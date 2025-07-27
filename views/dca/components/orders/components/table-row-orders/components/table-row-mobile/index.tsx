import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import CellText from '@/components/layout/cell-text';
import ExternalLink from '@/components/svg/external-link';

import { TableRowOrdersProps } from '../../table-row-orders.types';
import LabelText from '../label-text';

const TableRowMobile: FC<TableRowOrdersProps> = ({
  id,
  from,
  to,
  fromIcon,
  toIcon,
  orders,
  amount,
  percentage,
}) => (
  <Link href={`dca/orders/${id}`}>
    <Box p="m" display="flex" flexDirection="column" gap="0.25rem">
      <Box display="flex" gap="0.5rem">
        <CellText color="#FFFFFF">Pay With:</CellText>
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
        <CellText color="#FFFFFF">Get:</CellText>
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
        <CellText color="#FFFFFF">Orders:</CellText>
        <CellText color="#FFFFFF">{orders}</CellText>
      </Box>
      <Box display="flex" gap="0.5rem">
        <CellText color="#FFFFFF">Amount:</CellText>
        <CellText color="#FFFFFF">{amount}</CellText>
      </Box>
      <Box display="flex" gap="0.5rem">
        <CellText color="#FFFFFF">Status:</CellText>
        <Box
          display="flex"
          height="1.1875rem"
          maxWidth="2.125rem"
          alignItems="center"
          justifyContent="center"
          borderRadius="0.75rem"
          backgroundColor="#0053DB33"
        >
          <LabelText size="small" color="#5C9AFF" fontSize="0.625rem">
            {percentage}
          </LabelText>
        </Box>
      </Box>
      <Box display="flex" gap="0.5rem">
        <CellText color="#FFFFFF">Action:</CellText>
        <CellText color="#FF8181">Delete</CellText>
      </Box>
      <CellText color="#B4C5FF">See Details</CellText>
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
