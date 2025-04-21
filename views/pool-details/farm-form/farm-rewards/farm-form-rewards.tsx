import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { FARMS_BY_LP } from '@/constants';
import { useFarmAccount } from '@/hooks/use-farm-account';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { getCoinMetadata, parseToMetadata } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

const FarmFormRewards: FC = () => {
  const network = useNetwork<Network>();
  const { getValues } = useFormContext<IPoolForm>();
  const farm = FARMS_BY_LP[getValues('pool.poolAddress')];
  const { data: farmAccount, isLoading: loadingBalances } = useFarmAccount(
    getValues('pool.poolAddress')
  );

  const balances = farmAccount?.rewards.reduce(
    (acc, curr) => ({ ...acc, [curr.fa]: BigNumber(String(curr.amount)) }),
    {} as Record<string, BigNumber>
  );

  const { data: rewardsList, isLoading } = useSWR(
    ['rewardsList', farm.rewards],
    async () => {
      if (!farm.rewards) return [];

      return Promise.all(farm.rewards.map(getCoinMetadata)).then((coins) =>
        coins.map(parseToMetadata)
      );
    }
  );

  return (
    <Box>
      {isLoading
        ? farm.rewards.map(() => (
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
                  <Skeleton
                    width="1.6rem"
                    height="1.6rem"
                    borderRadius="0.1rem"
                  />
                  <Skeleton width="4rem" />
                </Box>
              </Box>
              <Typography variant="body" ml="m" mr="m" size="large">
                <Skeleton width="4rem" />
              </Typography>
            </Box>
          ))
        : rewardsList?.map((token) => (
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
                {loadingBalances ? (
                  <Skeleton width="4rem" />
                ) : balances?.[token.type] ? (
                  FixedPointMath.toNumber(balances[token.type], token.decimals)
                ) : (
                  0
                )}
              </Typography>
            </Box>
          ))}
    </Box>
  );
};

export default FarmFormRewards;
