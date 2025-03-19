import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import useSrAmmPool from '@/hooks/use-sr-amm-pool';
import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';
import { POOL_DATA } from '@/views/pools/pool.data';

import { FormFilterValue, InfoCardProps } from './info-card.types';
import InfoCardHeader from './info-card-header';
import InfoCardIcons from './info-card-icons';
import InfoCardTrade from './info-card-trade';

const InfoCard: FC<InfoCardProps> = ({ pool }) => {
  const { pool: data, loading } = useSrAmmPool(pool.poolAddress, false);

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
        <InfoCardHeader
          tags={[
            'V2(SR-AMM)',
            FormFilterValue['volatile'],
            POOL_DATA.filter(
              ({ poolAddress }) => poolAddress == pool.poolAddress
            ).length
              ? 'FARM'
              : '',
          ]}
        />
        <InfoCardIcons
          key={v4()}
          coins={pool ? [pool.metadata.x, pool.metadata.y] : []}
        />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          <InfoCardTrade
            noBorder
            amount="0.3%"
            description="Fee"
            tooltipInfo="Trade fee in percentage"
          />
          <InfoCardTrade
            loading={loading}
            tooltipInfo={`${pool.metadata.x.symbol} reserves`}
            description={pool.metadata.x.symbol ?? 'Balance X'}
            amount={formatMoney(
              FixedPointMath.toNumber(
                BigNumber(data?.balanceX.toString() ?? 0),
                pool.metadata.x.decimals
              )
            )}
          />
          <InfoCardTrade
            loading={loading}
            tooltipInfo={`${pool.metadata.y.symbol} reserves`}
            description={pool.metadata.y.symbol ?? 'Balance Y'}
            amount={formatMoney(
              FixedPointMath.toNumber(
                BigNumber(data?.balanceY.toString() ?? 0),
                pool.metadata.y.decimals
              )
            )}
          />
        </Box>
      </Box>
    </Link>
  );
};

export default InfoCard;
