import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CardInfo from '../card-info/page';
import TableOrders from './components/table-orders';

const Orders: FC = () => {
  return (
    <Box gap="1rem" width="100%" display="flex" flexDirection="column">
      <Box
        p="1.5rem"
        gap="1rem"
        width="100%"
        display="flex"
        bg="#9CA3AF1A"
        minHeight="22.75rem"
        flexDirection="column"
        borderRadius="0.75rem"
        border="1px solid #F3F4F61A"
      >
        <Box></Box>
        <Typography
          size="large"
          variant="title"
          color="#E5E7EB"
          fontWeight="600"
          fontFamily="Inter"
        >
          Performance overview
        </Typography>

        <Box
          flex="1"
          gap="0.6rem"
          display="flex"
          flexDirection={['column', 'row']}
        >
          <Box height="21.75rem" width={['100%', '45rem']}>
            <Typography
              size="large"
              variant="title"
              color="#E5E7EB"
              fontWeight="600"
              fontFamily="Inter"
            >
              Gráfico
            </Typography>
          </Box>
          <CardInfo
            width="25.125rem"
            title="Order Details"
            headers={['DCA MOVE Balance', 'DCA USDT Balance']}
            keys={['dcaMoveBalance', 'dcaUsdtBalance']}
            values={{
              dcaMoveBalance: '0,05 MOVE',
              dcaUsdtBalance: '2 USDT',
            }}
            isLoading={false}
          />
        </Box>
      </Box>
      <TableOrders data={[]} />
    </Box>
  );
};

export default Orders;
