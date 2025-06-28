import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';

const PoolFormDepositReceive: FC = () => {
  const { loading } = usePoolDetails();
  const network = useNetwork<Network>();
  const { control } = useFormContext<IPoolForm>();
  const value = useWatch({ control, name: 'lpCoin.value' });
  const symbol = useWatch({ control, name: 'lpCoin.symbol' });
  const iconURI = useWatch({ control, name: 'lpCoin.iconUri' });
  const standard = useWatch({ control, name: 'lpCoin.standard' });

  return (
    <Box>
      <Typography variant="body" size="large" mt="m" mb="xs">
        Receive:
      </Typography>
      <Box borderRadius="xs" bg="lowestContainer">
        <Box
          py="xs"
          pl="xs"
          pr="m"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap="m">
            <TokenIcon
              withBg
              url={iconURI}
              symbol={symbol}
              network={network}
              rounded={standard === TokenStandard.COIN}
            />
            <Typography variant="body" size="large">
              {loading ? <Skeleton width="4rem" /> : symbol}
            </Typography>
          </Box>
          <Typography variant="body" ml="m" size="large">
            {loading ? <Skeleton width="2rem" /> : (+value).toFixed(4) || 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolFormDepositReceive;
