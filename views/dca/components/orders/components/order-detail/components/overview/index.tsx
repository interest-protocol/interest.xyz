import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CardInfo from '../card-info/page';

const Overview: FC = () => {
  return (
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
      <Typography
        size="large"
        variant="title"
        color="#E5E7EB"
        fontWeight="600"
        fontFamily="Inter"
      >
        Overview
      </Typography>

      <Box
        flex="1"
        gap="0.6rem"
        display="flex"
        flexDirection={['column', 'row']}
      >
        <CardInfo
          width="25.125rem"
          headers={['DCA MOVE Balance', 'DCA USDT Balance']}
          keys={['dcaMoveBalance', 'dcaUsdtBalance']}
          values={{
            dcaMoveBalance: '0,05 MOVE',
            dcaUsdtBalance: '2 USDT',
          }}
          isLoading={false}
        />
        <CardInfo
          width="25.125rem"
          headers={['DCA MOVE Balance', 'DCA USDT Balance']}
          keys={['dcaMoveBalance', 'dcaUsdtBalance']}
          values={{
            dcaMoveBalance: '0,05 MOVE',
            dcaUsdtBalance: '2 USDT',
          }}
          isLoading={false}
        />
        <CardInfo
          width="25.125rem"
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
  );
};

export default Overview;
