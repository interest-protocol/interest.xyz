import { AccountAddress } from '@aptos-labs/ts-sdk';
import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import useCurvePool from '@/hooks/use-curve-pool';
import { Pools } from '@/interface';
import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';

import { POOL_DATA } from '../pool.data';
import { FormFilterValue } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardTrade from './pool-card-trade';

const PoolCurveCard: FC<{ pool: Pools }> = ({ pool }) => {
  const { pool: data, loading } = useCurvePool(pool.address.toString());

  console.log({ data });

  return (
    <Link
      href={`${Routes[RoutesEnum.PoolDetails]}?address=${pool.address.toString()}`}
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
        <PoolCardHeader
          tags={[
            'V2(SR-AMM)',
            FormFilterValue['volatile'],
            POOL_DATA.filter(({ poolAddress }) =>
              pool.address.equals(AccountAddress.from(poolAddress))
            ).length
              ? 'FARM'
              : '',
          ]}
        />
        <PoolCardInfo
          key={v4()}
          coins={data?.tokensMetadata ? data.tokensMetadata : []}
        />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          <PoolCardTrade
            noBorder
            amount="0.3%"
            description="Fee"
            tooltipInfo="Trade fee in percentage"
          />
          {data?.tokensMetadata?.map(({ symbol, decimals }) => (
            <PoolCardTrade
              key={v4()}
              loading={loading}
              tooltipInfo={`${symbol} reserves`}
              description={symbol ?? 'Balance X'}
              amount={formatMoney(
                FixedPointMath.toNumber(BigNumber(0), decimals)
              )}
            />
          ))}
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCurveCard;
