import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { FARMS_BY_LP } from '@/constants';
import { useFarmAccount } from '@/hooks/use-farm-account';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

const FarmFormRewards: FC = () => {
  const network = useNetwork<Network>();
  const { control, getValues } = useFormContext<IPoolForm>();
  const farm = FARMS_BY_LP[getValues('pool.poolAddress')];
  const farmAccount = useFarmAccount(getValues('pool.poolAddress'));

  const balance = farmAccount
    ? farmAccount.data?.amount && BigNumber(String(farmAccount.data.amount))
    : ZERO_BIG_NUMBER;

  const [tokenList] = useWatch({
    control,
    name: ['tokenList'],
  });

  console.log(farm.rewards, '>>REWARDS', farmAccount, balance);

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
          <Box display="flex" alignItems="center" gap="xs">
            <Box display="flex" gap="xs" alignItems="center">
              <TokenIcon withBg network={network} symbol={token.symbol} />
              <Typography variant="body" size="large">
                {token.symbol}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body" ml="m" mr="m" size="large">
            {token.value || 0}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FarmFormRewards;
