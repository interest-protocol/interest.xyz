import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { FARMS_BY_LP, Routes, RoutesEnum } from '@/constants';
import { getCoinMetadata, parseToMetadata } from '@/utils';

import { PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardSkeleton from './pool-card-skeleton';
import PoolCardTrade from './pool-card-trade';

const PoolCurveCard: FC<PoolCardProps> = ({ pool }) => {
  const [isLoading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState(pool.tokensMetadata);

  const isFarm = !!FARMS_BY_LP[pool.poolAddress];
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
        justifyContent="space-between"
        transition="all 300ms ease-in-out"
        borderColor={isFarm ? 'onSuccessContainer' : 'outlineVariant'}
        nHover={{
          cursor: 'pointer',
          borderColor: isFarm ? 'success' : '#76767A',
          boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
          '.arrow-wrapper': { opacity: 1 },
        }}
      >
        <PoolCardHeader
          tags={((isFarm ? ['earn'] : []) as string[]).concat([
            pool.algorithm,
            pool.curve,
          ])}
        />
        <PoolCardInfo key={v4()} coins={metadata ?? []} />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          <PoolCardTrade
            noBorder
            amount="0.3%"
            description="APR"
            tooltipInfo="Revenue for Provide Liquidity"
          />
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCurveCard;
