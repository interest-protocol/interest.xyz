import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import ExternalLink from '@/components/svg/external-link';

import LabelText from './components/label-text';
import RowText from './components/row-text';
import TokenCell from './components/token-cell';
import { RowTableOrdersProps } from './row-table-orders.types';

const RowTableOrders: FC<RowTableOrdersProps> = ({
  id,
  from,
  to,
  fromIcon,
  toIcon,
  orders,
  amount,
  percentage,
}) => (
  <Link href={`dca/orders/${id}`} passHref legacyBehavior>
    <Box
      px="1rem"
      width="100%"
      bg="#030712"
      height="4rem"
      display="flex"
      cursor="pointer"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid #1F2937"
      nHover={{
        bg: '#1F2937',
      }}
    >
      <TokenCell icon={fromIcon} label={from} width="20%" />
      <TokenCell icon={toIcon} label={to} width="20%" />
      <RowText width="10%">{orders}</RowText>
      <RowText width="10%">{amount}</RowText>

      <Box width="10%">
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

      <RowText width="10%">
        <LabelText color="#FF8181" cursor="pointer" fontWeight="500">
          Delete
        </LabelText>
      </RowText>

      <Box width="20%" display="flex" justifyContent="space-between">
        <LabelText color="#B4C5FF" cursor="pointer" fontWeight="500">
          See Details
        </LabelText>
        <ExternalLink
          width="100%"
          color="#9CA3AF"
          maxWidth="0.625rem"
          maxHeight="0.625rem"
        />
      </Box>
    </Box>
  </Link>
);

export default RowTableOrders;
