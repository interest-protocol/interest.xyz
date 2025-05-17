import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { isEmpty } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { FARMS_BY_LP, Routes, RoutesEnum } from '@/constants';
import { MOVE } from '@/constants/coins';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import { useFarms } from '@/hooks/use-farms';
import { usePool } from '@/hooks/use-pool';
import { FixedPointMath } from '@/lib';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import {
  formatDollars,
  formatMoney,
  getCoinMetadata,
  parseToMetadata,
} from '@/utils';

import { IPoolForm } from '../pools.types';
import { PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardSkeleton from './pool-card-skeleton';
import PoolCardTrade from './pool-card-trade';

const PoolCurveCard: FC<PoolCardProps> = ({ pool }) => {
  const isFarm = !!FARMS_BY_LP[pool.poolAddress];
  const { pool: data } = usePool(pool.poolAddress);
  const { data: farms } = useFarms([pool.poolAddress]);
  const { data: prices } = useCoinsPrice(
    Array.from(new Set([...pool.tokensAddresses, MOVE.address.toString()]))
  );
  const [filteredTokens, setFilteredTokens] = useState<
    Array<AssetMetadata> | undefined
  >([]);

  const { control, getValues } = useFormContext<IPoolForm>();
  const search = useWatch({ control, name: 'search' });

  const { data: metadata, isLoading } = useSWR(
    ['pool-metadata', pool.tokensAddresses, pool.poolAddress],
    () => {
      if (pool.tokensMetadata) return pool.tokensMetadata;

      return Promise.all(
        pool.tokensAddresses.map((token) => getCoinMetadata(token))
      ).then((result) => result.map(parseToMetadata));
    }
  );

  const tokenPrices = pool.tokensAddresses.map(
    (address) => prices?.find(({ coin }) => coin === address)?.price ?? 0
  );

  const tokenBalances = data?.balances;
  const tokenDecimals = metadata?.map?.(({ decimals }) => decimals);

  const tvl =
    tokenBalances && tokenDecimals && !isEmpty(tokenDecimals)
      ? tokenBalances?.reduce(
          (acc, balance, index) =>
            acc +
            FixedPointMath.toNumber(
              BigNumber(balance).times(tokenPrices[index]),
              pool.algorithm === 'curve' ? 18 : tokenDecimals[index]
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

  useEffect(() => {
    const tmp = metadata
      ? metadata.filter(
          (token) =>
            token.symbol.toLowerCase().includes(search?.toLowerCase() || '') ||
            token.name.toLowerCase().includes(search?.toLowerCase() || '') ||
            token.type.toLowerCase().includes(search?.toLowerCase() || '')
        )
      : [];
    setFilteredTokens(tmp);
  }, [metadata, search]);

  if (isLoading) return <PoolCardSkeleton />;

  if (search && !filteredTokens?.length) return;

  const volume = getValues('metrics')?.filter(
    (metric) => metric.poolId == pool.poolAddress
  );
  return (
    <Link
      href={`${Routes[RoutesEnum.PoolDetails]}?address=${pool.poolAddress}`}
    >
      <Box
        p="m"
        flex="1"
        gap="xs"
        height="100%"
        display="flex"
        borderRadius="xs"
        bg="lowestContainer"
        flexDirection="column"
        border="0.063rem solid"
        justifyContent="space-between"
        transition="all 300ms ease-in-out"
        borderColor={isFarm ? 'onSuccessContainer' : 'outlineVariant'}
        nHover={{
          cursor: 'pointer',
          borderColor: isFarm ? 'success' : '#76767A',
          boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
          '.arrow-wrapper': { display: 'block' },
        }}
      >
        <PoolCardHeader
          tags={((isFarm ? ['earn'] : []) as string[]).concat([
            pool.algorithm,
            pool.algorithm != 'v2' ? pool.curve : '',
          ])}
        />
        <PoolCardInfo key={v4()} coins={metadata ?? []} />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          <PoolCardTrade
            noBorder
            description="APR"
            tooltipInfo="Annual Percentage Rate"
            amount={`${formatMoney(((apr?.[0] && !isNaN(apr[0]) ? apr[0] : 0) * 100) / (tvl || 1))}%`}
          />
          <PoolCardTrade
            noBorder
            description="TVL"
            amount={formatDollars(tvl)}
            tooltipInfo="Total Value Locked"
          />
          <PoolCardTrade
            noBorder
            description="24h volume"
            amount={
              volume?.length
                ? formatDollars(Number(volume?.[0].metrics.volume))
                : 'N/A'
            }
            tooltipInfo="24h volume"
          />
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCurveCard;
