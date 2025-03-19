import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import useSrAmmPool from '@/hooks/use-sr-amm-pool';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatMoney, ZERO_BIG_NUMBER } from '@/utils';

import PoolTitleBar from '../components/pool-title-bar';
import { IPoolForm } from '../pools/pools.types';
import EarnCard from './earn-details-card';
import PoolForm from './pool-form';
import PoolInfo from './pool-info';

const PoolTitle: FC = () => {
  const { push } = useRouter();
  const { getValues } = useFormContext<IPoolForm>();
  const { pool, loading } = useSrAmmPool(getValues('pool.poolAddress'));

  return (
    <PoolTitleBar
      loading={!pool || loading}
      onBack={() => push(Routes[RoutesEnum.Pools])}
    />
  );
};

const PoolContent: FC = () => {
  const { coinsMap } = useCoins();
  const { control } = useFormContext<IPoolForm>();
  const [isEarnPoolView, lpCoinType, lpCoinDecimals] = useWatch({
    control,
    name: ['isEarnPoolView', 'lpCoin.type', 'lpCoin.decimals'],
  });

  const lpCoin = coinsMap[lpCoinType];

  const lpCoinBalance = lpCoin?.balance ?? ZERO_BIG_NUMBER;

  if (isEarnPoolView)
    return (
      <Box
        gap="xs"
        mx="auto"
        display="grid"
        maxWidth="65rem"
        borderRadius="xs"
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        <EarnCard
          key={v4()}
          label="Stake"
          token={lpCoin}
          secondaryButton={
            <Button
              color="primary"
              variant="outline"
              borderRadius="2xs"
              borderStyle="1px solid"
              borderColor="outlineVariant"
            >
              Reset
            </Button>
          }
          primaryButton={
            <Button borderRadius="2xs" variant="filled">
              Add
            </Button>
          }
          balance={formatMoney(
            FixedPointMath.toNumber(lpCoinBalance, lpCoinDecimals)
          )}
        />
        <EarnCard
          key={v4()}
          balance="0"
          token={lpCoin}
          label="Unstaked"
          secondaryButton={
            <Button
              color="primary"
              variant="outline"
              borderRadius="2xs"
              borderStyle="1px solid"
              borderColor="outlineVariant"
            >
              Reset
            </Button>
          }
          primaryButton={
            <Button borderRadius="2xs" variant="filled">
              remove
            </Button>
          }
        />
        <EarnCard
          key={v4()}
          isRewards
          balance="0"
          token={lpCoin}
          label="Rewards"
          primaryButton={
            <Button borderRadius="2xs" mt="3rem" variant="filled">
              Harvest
            </Button>
          }
        />
      </Box>
    );

  return (
    <Box
      gap="xs"
      mx="auto"
      maxWidth="65rem"
      overflow="hidden"
      flexDirection="column"
      gridTemplateColumns="3fr 2fr"
      display={['flex', 'flex', 'flex', 'grid']}
      alignItems={['unset', 'unset', 'unset', 'start']}
    >
      <PoolForm />
      <PoolInfo />
    </Box>
  );
};

const PoolDetails: FC = () => (
  <Layout>
    <Box>
      <PoolTitle />
      <PoolContent />
    </Box>
  </Layout>
);

export default PoolDetails;
