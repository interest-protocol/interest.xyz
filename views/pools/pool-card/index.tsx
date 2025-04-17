import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { usePool } from '@/hooks/use-pool';
import { FixedPointMath } from '@/lib';
import { formatMoney, getCoinMetadata, parseToMetadata } from '@/utils';

import { PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardSkeleton from './pool-card-skeleton';
import PoolCardTrade from './pool-card-trade';

const PoolCurveCard: FC<PoolCardProps> = ({ pool }) => {
  const [isLoading, setLoading] = useState(false);
  const { pool: data, loading } = usePool(pool.poolAddress);
  const [metadata, setMetadata] = useState(pool.tokensMetadata);

  useEffect(() => {
    if (metadata || isLoading) return;

    setLoading(true);

    Promise.all(pool.tokensAddresses.map((token) => getCoinMetadata(token)))
      .then((result) => setMetadata(result.map(parseToMetadata)))
      .finally(() => setLoading(false));
  }, [pool]);

  if (isLoading) return <PoolCardSkeleton />;

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
        borderColor="outlineVariant"
        justifyContent="space-between"
        transition="all 300ms ease-in-out"
        nHover={{
          cursor: 'pointer',
          borderColor: '#76767A',
          boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
          '.arrow-wrapper': { opacity: 1 },
        }}
      >
        <PoolCardHeader tags={[pool.algorithm, pool.curve]} />
        <PoolCardInfo key={v4()} coins={metadata ?? []} />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          <PoolCardTrade
            noBorder
            amount="0.3%"
            description="Fee"
            tooltipInfo="Trade fee in percentage"
          />
          {metadata?.map(({ symbol, decimals }, index) => (
            <PoolCardTrade
              key={v4()}
              loading={loading}
              tooltipInfo={`${symbol} reserves`}
              description={symbol ?? 'Balance X'}
              amount={formatMoney(
                FixedPointMath.toNumber(
                  BigNumber(String(data?.balances?.[index] ?? 0)),
                  pool.algorithm === 'curve' ? 18 : decimals
                )
              )}
            />
          ))}
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCurveCard;
