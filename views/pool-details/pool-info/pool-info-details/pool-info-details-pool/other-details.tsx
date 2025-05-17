import BigNumber from 'bignumber.js';
import { isEmpty } from 'ramda';
import { FC } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { MOVE } from '@/constants/coins';
import { useMetrics } from '@/hooks';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import { FixedPointMath } from '@/lib';
import { formatDollars, getCoinMetadata, parseToMetadata } from '@/utils';
import { PoolCardProps } from '@/views/pools/pool-card/pool-card.types';

import ItemStandard from '../../components/accordion/item-standard';

const OtherInfoDetails: FC<PoolCardProps> = ({ pool }) => {
  const { data: metrics, isLoading: loadingVolume } = useMetrics();
  const { data: prices } = useCoinsPrice(
    Array.from(new Set([...pool.tokensAddresses, MOVE.address.toString()]))
  );

  const { data: metadata, isLoading } = useSWR(
    ['pool-details-metadata', pool.poolAddress],
    () => {
      if (pool.tokensMetadata) return pool.tokensMetadata;

      return Promise.all(
        pool.tokensAddresses.map((token) => getCoinMetadata(token))
      ).then((result) => result.map(parseToMetadata));
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );

  const tokenPrices = pool.tokensAddresses.map(
    (address) => prices?.find(({ coin }) => coin === address)?.price ?? 0
  );

  const tokenBalances = pool?.balances;
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

  return (
    <>
      <ItemStandard
        key={v4()}
        label="TVL"
        loading={isLoading}
        content={{ value: formatDollars(tvl) }}
      />
      <ItemStandard
        key={v4()}
        label="Volume"
        loading={loadingVolume}
        content={{
          value: formatDollars(
            Number(
              metrics?.data?.filter(
                (metric) => metric.poolId == pool.poolAddress
              )?.[0].metrics.volume ?? '0'
            )
          ),
        }}
      />
    </>
  );
};

export default OtherInfoDetails;
