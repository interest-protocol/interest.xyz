import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import { FieldProps } from '../preview.types';

const LpCoinField: FC<FieldProps> = ({ getValues }) => {
  const network = useNetwork<Network>();

  return (
    <Box>
      <Box py="xs" display="flex" justifyContent="space-between">
        <Box display="flex" gap="xs" alignItems="center">
          <Box
            display="flex"
            bg="onSurface"
            width="1.5rem"
            height="1.5rem"
            borderRadius="full"
            alignItems="center"
            justifyContent="center"
            color="lowestContainer"
          >
            <TokenIcon
              withBg
              size="1rem"
              network={network}
              url={getValues('lpCoin.iconUri')}
              symbol={getValues('lpCoin.symbol')}
              rounded={getValues('lpCoin.standard') === TokenStandard.COIN}
            />
          </Box>
          <Typography variant="body" size="large">
            {getValues('lpCoin.symbol')}
          </Typography>
        </Box>
        <Typography variant="body" ml="m" size="large">
          {getValues('lpCoin.value')}
        </Typography>
      </Box>
    </Box>
  );
};
export default LpCoinField;
