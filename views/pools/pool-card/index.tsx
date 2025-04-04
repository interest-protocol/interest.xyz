import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { usePool } from '@/hooks/use-pool';
import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';

import { PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardTrade from './pool-card-trade';

const PoolCurveCard: FC<PoolCardProps> = ({ pool }) => {
  const { pool: data, loading } = usePool(pool.poolAddress);

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
        <PoolCardInfo key={v4()} coins={pool.tokensMetadata!} />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          <PoolCardTrade
            noBorder
            amount="0.3%"
            description="Fee"
            tooltipInfo="Trade fee in percentage"
          />
          {pool.tokensMetadata!.map(({ symbol, decimals }, index) => (
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
