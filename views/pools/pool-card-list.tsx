import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { inc } from 'ramda';
import { FC, useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { FARMS_BY_LP } from '@/constants';
import { POOLS } from '@/constants/pools';
import { useMetrics } from '@/hooks';
import { usePools } from '@/hooks/use-pools';
import { IPool } from '@/interface';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';

import PoolCard from './pool-card';
import { FormFilterValue } from './pool-card/pool-card.types';
import PoolCardSkeleton from './pool-card/pool-card-skeleton';
import {
  FilterTypeEnum,
  IPoolForm,
  PoolCardListContentProps,
  PoolCardListProps,
  PoolTabEnum,
} from './pools.types';

const Pools: FC = () => {
  const [page, setPage] = useState(1);
  const { control, getValues } = useFormContext<IPoolForm>();
  const [pools, setPools] = useState<ReadonlyArray<ReadonlyArray<IPool>>>([
    POOLS,
  ]);

  const tokenList = getValues('tokenList');
  const [filterProps, isFindingPool] = useWatch({
    control,
    name: ['filterList', 'isFindingPool'],
  });

  useEffect(() => {
    if (isFindingPool || page != 1) {
      setPools([
        POOLS.filter(
          (pool) =>
            tokenList[0].type == pool?.tokensAddresses?.[0] &&
            tokenList[1].type == pool?.tokensAddresses?.[1]
        ),
      ]);
      setPage(1);
    }
  }, [isFindingPool, filterProps]);

  const memoPools = useMemo(
    () =>
      pools.map((poolPage) =>
        poolPage.filter(({ algorithm, curve, poolAddress }) =>
          filterProps.reduce((result, { type, value }) => {
            if (type === FilterTypeEnum.ALGORITHM)
              return result && value === curve;

            if (type === FilterTypeEnum.POOL_TYPE) {
              const isEarn = value === FormFilterValue.earn;
              const isFarm = !!FARMS_BY_LP[poolAddress];

              return result && (isEarn ? isFarm : value === algorithm);
            }

            return result;
          }, true)
        )
      ),
    [pools, filterProps]
  );

  return (
    <PoolCardListContent
      done={true}
      hasMore={false}
      pools={memoPools}
      arePoolsLoading={false}
      next={() => setPage(inc)}
    />
  );
};

const Position: FC = () => {
  const { coins } = useCoins();
  const [page, setPage] = useState(1);
  const { control, getValues } = useFormContext<IPoolForm>();
  const [pools, setPools] = useState<ReadonlyArray<ReadonlyArray<IPool>>>([
    POOLS,
  ]);

  const filterProps = useWatch({
    control,
    name: 'filterList',
  });
  const isFindingPool = useWatch({
    control,
    name: 'isFindingPool',
  });

  const tokenList = getValues('tokenList');

  const { data, isLoading: arePoolsLoading } = usePools(
    page,
    isFindingPool
      ? {
          $and: [
            {
              metadataX: {
                $in: tokenList?.map(({ type }) => type.toString()),
              },
            },
            {
              metadataY: {
                $in: tokenList?.map(({ type }) => type.toString()),
              },
            },
            {
              poolAddress: {
                $in: coins?.map(({ type }) => type.toString()),
              },
            },
          ],
        }
      : {
          poolAddress: {
            $in: coins?.map(({ type }) => type),
          },
        }
  );

  useEffect(() => {
    if (page != 1) {
      setPools([[]]);
      setPage(1);
    }
  }, [isFindingPool, filterProps]);

  useEffect(() => {
    if (data?.pools) setPools([...pools.slice(0, page), data.pools]);
  }, [data?.pools]);

  const memoPools = useMemo(
    () =>
      pools.map((poolPage) =>
        poolPage.filter(
          ({ poolAddress, algorithm, curve }) =>
            coins.some(({ type }) => poolAddress === type) &&
            filterProps.reduce((result, { type, value }) => {
              if (type === FilterTypeEnum.ALGORITHM)
                return result && value === curve;

              if (type === FilterTypeEnum.POOL_TYPE) {
                const isEarn = value === FormFilterValue.earn;
                const isFarm = !!FARMS_BY_LP[poolAddress];

                return result && (isEarn ? isFarm : value === algorithm);
              }

              return result;
            }, true)
        )
      ),
    [pools, filterProps, coins]
  );

  return (
    <PoolCardListContent
      pools={memoPools}
      done={!!data?.done}
      next={() => setPage(inc)}
      arePoolsLoading={arePoolsLoading}
      hasMore={(data?.totalPages ?? 0) > page}
    />
  );
};

const PoolCardListContent: FC<PoolCardListContentProps> = ({
  done,
  next,
  pools,
  hasMore,
  arePoolsLoading,
}) => {
  if (arePoolsLoading)
    return (
      <Box
        gap="xs"
        display="grid"
        borderRadius="xs"
        p={['s', 's', 's', 'l']}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        <PoolCardSkeleton />
      </Box>
    );

  if (!!pools && !pools?.flatMap((poolPage) => poolPage).length && done)
    return (
      <Box width="100%" color="onSurface" my="3xl">
        <Typography size="small" variant="display">
          No pool found!
        </Typography>
      </Box>
    );

  return (
    <>
      <Box
        gap="xs"
        borderRadius="xs"
        p={['s', 's', 's', 'l']}
        display={pools?.length ? 'grid' : 'flex'}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        {pools?.flatMap((poolPage) =>
          poolPage.map((pool) => <PoolCard key={v4()} pool={pool} />)
        )}
        {arePoolsLoading && <PoolCardSkeleton />}
      </Box>
      {hasMore && (
        <Box mx="m" display="flex" justifyContent="center" onClick={next}>
          <Button variant="filled">Load more</Button>
        </Box>
      )}
    </>
  );
};

const PoolCardList: FC<PoolCardListProps> = ({ tab }) => {
  const { setValue, getValues } = useFormContext<IPoolForm>();
  const { data: metrics, isLoading } = useMetrics();

  useEffect(() => {
    if (!isLoading && !getValues('metrics')) setValue('metrics', metrics?.data);
  }, [isLoading]);

  return tab === PoolTabEnum.Pools ? <Pools /> : <Position />;
};

export default PoolCardList;
