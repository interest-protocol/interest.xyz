import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { IPoolForm } from '@/views/pools/pools.types';

const PoolFormWithdrawReceiveTokens: FC = () => {
  const network = useNetwork<Network>();

  const { control } = useFormContext<IPoolForm>();

  const tokenList = useWatch({ control, name: 'tokenList' });

  return (
    <Box>
      {tokenList.map((token) => (
        <Box
          py="m"
          px="xs"
          key={v4()}
          display="flex"
          cursor="pointer"
          alignItems="center"
          justifyContent="space-between"
          transition="all 350ms ease-in-out"
          nHover={{ bg: 'lowContainer' }}
        >
          <Box display="flex" gap="xs" alignItems="center">
            <TokenIcon withBg network={network} symbol={token.symbol} />
            <Typography variant="body" size="large">
              {token.symbol}
            </Typography>
          </Box>
          <Typography variant="body" ml="m" mr="m" size="large">
            {token.value || 0}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PoolFormWithdrawReceiveTokens;
