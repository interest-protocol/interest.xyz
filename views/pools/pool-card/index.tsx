import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { FARMS_BY_LP, Routes, RoutesEnum } from '@/constants';
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
            tooltipInfo={[
              {
                value: volume?.length
                  ? formatMoney(
                      +Number(volume?.[0].metrics.farmApr).toFixed(2)
                    ) + ' %'
                  : 'N/A',
                label: 'Farm APR',
              },
              {
                value: volume?.length
                  ? formatMoney(+Number(volume?.[0].metrics.apr).toFixed(2)) +
                    ' %'
                  : 'N/A',
                label: 'Fees APR',
              },
            ]}
            amount={
              volume?.length ? (
                formatMoney(
                  +(
                    Number(volume?.[0].metrics.farmApr) +
                    Number(volume?.[0].metrics.apr)
                  ).toFixed(2)
                ) + ' %'
              ) : (
                <Skeleton width="4rem" />
              )
            }
          />
          <PoolCardTrade
            noBorder
            description="Volume (24h)"
            tooltipInfo="Volume (24h)"
            amount={
              volume?.length ? (
                formatDollars(+Number(volume?.[0].metrics.volume1D).toFixed(2))
              ) : (
                <Skeleton width="4rem" />
              )
            }
          />
          <PoolCardTrade
            noBorder
            description="TVL"
            tooltipInfo="Total Value Locked"
            amount={
              volume?.length ? (
                formatDollars(+Number(volume?.[0].metrics.tvl).toFixed(2))
              ) : (
                <Skeleton width="4rem" />
              )
            }
          />
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCurveCard;
