import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { FARMS_BY_LP, Routes, RoutesEnum } from '@/constants';
import { useFarmAccount } from '@/hooks/use-farm-account';
import { useLPCoinPrice } from '@/hooks/use-lp-coin-price';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import {
  formatDollars,
  formatMoney,
  getCoinMetadata,
  parseToMetadata,
  ZERO_BIG_NUMBER,
} from '@/utils';

import { IPoolForm } from '../pools.types';
import { PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardSkeleton from './pool-card-skeleton';
import PoolCardTrade from './pool-card-trade';

const PoolCurveCard: FC<PoolCardProps> = ({ pool }) => {
  const { coinsMap } = useCoins();
  const isFarm = !!FARMS_BY_LP[pool.poolAddress];

  const { data: lpPriceCustom, loading: lpLoading } = useLPCoinPrice(
    pool?.poolAddress
  );
  const [filteredTokens, setFilteredTokens] = useState<
    Array<AssetMetadata> | undefined
  >([]);
  const farmAccount = useFarmAccount(pool.poolAddress);
  const { control, getValues, setValue } = useFormContext<IPoolForm>();

  const search = useWatch({ control, name: 'search' });

  const lpToken = coinsMap[pool.poolAddress] ?? ZERO_BIG_NUMBER;

  const stakedBalance = farmAccount.data?.amount
    ? BigNumber(String(farmAccount.data.amount))
    : ZERO_BIG_NUMBER;

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

  useEffect(() => {
    if (!(isLoading || !lpPriceCustom || lpLoading || !farmAccount)) {
      const positionList = getValues('positionList') || {};
      const tmpWalletPosition = lpPriceCustom
        ? FixedPointMath.toNumber(lpToken.balance, lpToken.decimals) *
          lpPriceCustom?.lpPrice
        : 0;
      const tmpFarmPosition = lpPriceCustom
        ? FixedPointMath.toNumber(stakedBalance, lpToken.decimals) *
          lpPriceCustom?.lpPrice
        : 0;
      setValue('positionList', {
        ...positionList,
        [pool.poolAddress]: tmpWalletPosition + tmpFarmPosition,
      });
    }
  }, [isLoading, lpPriceCustom, lpLoading, farmAccount]);

  if (isLoading) return <PoolCardSkeleton />;

  if (search && !filteredTokens?.length) return;

  const volume = getValues('metrics')?.filter(
    (metric) => metric.poolId == pool.poolAddress
  );

  console.log(pool.poolAddress, {
    lpPriceCustom,
    stakedBalance,
    decimals: lpToken.decimals,
    balance: lpToken.balance,
    data: formatDollars(
      lpPriceCustom
        ? FixedPointMath.toNumber(
            lpToken.balance?.plus(stakedBalance),
            lpToken.decimals
          ) * lpPriceCustom?.lpPrice
        : 0
    ),
  });

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
                  : '0.00',
                label: 'Farm APR',
              },
              {
                value: volume?.length
                  ? formatMoney(+Number(volume?.[0].metrics.apr).toFixed(2)) +
                    ' %'
                  : '0.00',
                label: 'Fees APR',
              },
            ]}
            amount={
              volume?.length
                ? formatMoney(
                    +(
                      Number(volume?.[0].metrics.farmApr) +
                      Number(volume?.[0].metrics.apr)
                    ).toFixed(2)
                  ) + ' %'
                : '0.00'
            }
          />
          <PoolCardTrade
            noBorder
            description="Volume (24h)"
            tooltipInfo="Volume (24h)"
            amount={
              volume?.length
                ? formatDollars(
                    +Number(volume?.[0].metrics.volume1D).toFixed(2)
                  )
                : '0.00'
            }
          />
          <PoolCardTrade
            noBorder
            description="TVL"
            tooltipInfo="Total Value Locked"
            amount={
              volume?.length
                ? formatDollars(+Number(volume?.[0].metrics.tvl).toFixed(2))
                : '0.00'
            }
          />
          <PoolCardTrade
            noBorder
            description="Position"
            tooltipInfo={[
              {
                value: formatDollars(
                  lpPriceCustom
                    ? FixedPointMath.toNumber(stakedBalance, lpToken.decimals) *
                        lpPriceCustom?.lpPrice
                    : 0
                ),
                label: 'Farm Position',
              },
              {
                value: formatDollars(
                  lpPriceCustom
                    ? FixedPointMath.toNumber(
                        lpToken.balance,
                        lpToken.decimals
                      ) * lpPriceCustom?.lpPrice
                    : 0
                ),
                label: 'Pool Position',
              },
            ]}
            amount={formatDollars(
              lpPriceCustom
                ? FixedPointMath.toNumber(
                    lpToken.balance?.plus(stakedBalance),
                    lpToken.decimals
                  ) * lpPriceCustom?.lpPrice
                : 0
            )}
          />
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCurveCard;
