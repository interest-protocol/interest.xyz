import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { inc } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { usePools } from '@/hooks/use-pools';
import { ISrPool } from '@/interface';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import InfoCard from '@/views/components/info-card';
import InfoCardSkeleton from '@/views/components/info-card/info-card-skeleton';

import { FormFilterValue } from './pool-card/pool-card.types';
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
  const [pools, setPools] = useState<ReadonlyArray<ReadonlyArray<ISrPool>>>([
    [],
  ]);

  const tokenList = getValues('tokenList');
  const [filterProps, isFindingPool] = useWatch({
    control,
    name: ['filterList', 'isFindingPool'],
  });

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
          ],
        }
      : !filterProps.length ||
          filterProps?.some(
            (filterProp) =>
              filterProp.type === FilterTypeEnum.CATEGORY &&
              filterProp.value === FormFilterValue.all
          )
        ? {}
        : {}
  );

  useEffect(() => {
    if (isFindingPool || page != 1) {
      setPools([[]]);
      setPage(1);
    }
  }, [isFindingPool, filterProps]);

  useEffect(() => {
    if (data?.pools) setPools([...pools.slice(0, page), data.pools]);
  }, [data?.pools]);

  return (
    <PoolCardListContent
      pools={pools}
      done={!!data?.done}
      next={() => setPage(inc)}
      arePoolsLoading={arePoolsLoading}
      hasMore={(data?.totalPages ?? 0) > page}
    />
  );
};

const Position: FC = () => {
  const { coins } = useCoins();
  const [page, setPage] = useState(1);
  const [pools, setPools] = useState([[]]);
  const { control, getValues } = useFormContext<IPoolForm>();

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

  if (!data?.pools?.length)
    return (
      <Box width="100%" color="onSurface" textAlign="center" my="3xl">
        <Typography size="large" variant="label">
          There is no pools in your list
        </Typography>
      </Box>
    );

  return (
    <PoolCardListContent
      pools={pools}
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
        <InfoCardSkeleton isPool />
      </Box>
    );

  if (!!pools && !pools.length && done)
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
          poolPage.map((pool) => <InfoCard key={v4()} pool={pool} />)
        )}
        {arePoolsLoading && <InfoCardSkeleton isPool />}
      </Box>
      {hasMore && (
        <Box mx="m" display="flex" justifyContent="center" onClick={next}>
          <Button variant="filled">Load more</Button>
        </Box>
      )}
    </>
  );
};

const PoolCardList: FC<PoolCardListProps> = ({ tab }) =>
  tab === PoolTabEnum.Pools ? <Pools /> : <Position />;

export default PoolCardList;
