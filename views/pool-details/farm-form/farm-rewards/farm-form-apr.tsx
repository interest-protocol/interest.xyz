import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { isEmpty } from 'ramda';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { MOVE } from '@/constants/coins';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import { useFarms } from '@/hooks/use-farms';
import { FixedPointMath } from '@/lib';
import { formatMoney, getCoinMetadata, parseToMetadata } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

const FarmFormAPR: FC = () => {
  const { getValues } = useFormContext<IPoolForm>();
  const { data: farms } = useFarms([getValues('pool.poolAddress')]);
  const { data: prices } = useCoinsPrice(
    Array.from(
      new Set([...getValues('pool.tokensAddresses'), MOVE.address.toString()])
    )
  );

  const { data: metadata, isLoading } = useSWR(
    [
      'pool-metadata',
      getValues('pool.tokensAddresses'),
      getValues('pool.poolAddress'),
    ],
    () => {
      if (getValues('pool.tokensMetadata'))
        return getValues('pool.tokensMetadata');

      return Promise.all(
        getValues('pool.tokensAddresses').map((token) => getCoinMetadata(token))
      ).then((result) => result.map(parseToMetadata));
    }
  );

  const tokenPrices = getValues('pool.tokensAddresses').map(
    (address) => prices?.find(({ coin }) => coin === address)?.price ?? 0
  );

  const tokenBalances = getValues('pool.balances');
  const tokenDecimals = metadata?.map?.(({ decimals }) => decimals);

  const tvl =
    tokenBalances && tokenDecimals && !isEmpty(tokenDecimals)
      ? tokenBalances?.reduce(
          (acc, balance, index) =>
            acc +
            FixedPointMath.toNumber(
              BigNumber(balance).times(tokenPrices[index]),
              getValues('pool.algorithm') === 'curve'
                ? 18
                : tokenDecimals[index]
            ),
          0
        )
      : 0;

  const apr = farms?.[0]?.rewards.map(({ rewardFa, rewardsPerSecond }) =>
    FixedPointMath.toNumber(
      BigNumber(String(rewardsPerSecond))
        .times(
          prices?.find(({ coin }) => coin === MOVE.address.toString())?.price ??
            0
        )
        .times(60 * 60 * 24 * 365),
      rewardFa.decimals
    )
  );

  return (
    <Box
      py={['m', 'unset']}
      px="m"
      key={v4()}
      display="flex"
      cursor="pointer"
      alignItems="center"
      borderRadius="full"
      bg="successContainer"
      color="onSuccessContainer"
      justifyContent="space-between"
      transition="all 350ms ease-in-out"
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body" size="medium">
          APR:
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body" ml="xs" size="medium">
          {isLoading ? (
            <Skeleton width="4rem" />
          ) : (
            formatMoney(
              ((apr?.[0] && !isNaN(apr[0]) ? apr[0] : 0) * 100) / (tvl || 1)
            )
          )}
          %
        </Typography>
      </Box>
    </Box>
  );
};

export default FarmFormAPR;
