import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import { FieldProps } from '../preview.types';

const TokenListFields: FC<FieldProps> = ({ getValues }) => {
  const network = useNetwork<Network>();
  const tokenList = getValues('tokenList');

  return (
    <Box>
      {tokenList.map((token) => (
        <Box
          key={v4()}
          py="xs"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" gap="xs" alignItems="center">
            <TokenIcon
              withBg
              symbol={token.symbol}
              network={network as Network}
            />
            <Typography variant="body" size="large">
              {token.symbol}
            </Typography>
          </Box>
          <Typography variant="body" ml="m" size="medium">
            {token.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TokenListFields;
