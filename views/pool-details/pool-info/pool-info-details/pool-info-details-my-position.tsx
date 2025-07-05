import BigNumber from 'bignumber.js';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { useMetrics } from '@/hooks';
import { useFarmAccount } from '@/hooks/use-farm-account';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import Accordion from '../components/accordion';
import ItemStandard from '../components/accordion/item-standard';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsMyPosition: FC = () => {
  const { coinsMap } = useCoins();
  const aptosClient = useAptosClient();
  const { pool, loading } = usePoolDetails();

  const { getValues } = useFormContext<IPoolForm>();

  const [tvl, setTvl] = useState(0);
  const { data: metrics, isLoading } = useMetrics();

  useEffect(() => {
    setTvl(
      Number(
        metrics?.data?.find(
          (metric) => metric.poolId == getValues('pool.poolAddress')
        )?.metrics?.tvl ?? '0'
      )
    );
  }, [isLoading, metrics]);

  const { data: supply } = useSWR([getValues('lpCoin.type')], async () => {
    if (!getValues('lpCoin.type')) return ZERO_BIG_NUMBER;

    const resources = await aptosClient.getAccountResources({
      accountAddress: getValues('lpCoin.type'),
    });

    const supplyStruct = resources.find(
      ({ type }) => type === '0x1::fungible_asset::ConcurrentSupply'
    );

    if (!supplyStruct || !supplyStruct?.data) return ZERO_BIG_NUMBER;

    return BigNumber((supplyStruct.data as any)['current']!['value']);
  });

  const lpPrice =
    tvl /
    FixedPointMath.toNumber(
      supply ?? BigNumber(1),
      pool?.poolMetadata?.decimals
    );

  const farmAccount = useFarmAccount(getValues('lpCoin.type'));

  if (!pool || loading || isLoading)
    return (
      <Accordion title="My Position" noBorder>
        <PoolInfoLoading />
      </Accordion>
    );

  const lpBalance =
    coinsMap[getValues('lpCoin.type')]?.balance ?? ZERO_BIG_NUMBER;

  const stakedBalance = farmAccount.data?.amount
    ? BigNumber(String(farmAccount.data.amount))
    : ZERO_BIG_NUMBER;

  const MY_POSITIONS: ReadonlyArray<[string, number]> = [
    [
      'Pool Position',
      FixedPointMath.toNumber(lpBalance, pool.poolMetadata?.decimals) * lpPrice,
    ],
    [
      'Farm Position',
      FixedPointMath.toNumber(stakedBalance, pool.poolMetadata?.decimals) *
        lpPrice,
    ],
    [
      'Total Position',
      FixedPointMath.toNumber(
        stakedBalance.plus(lpBalance),
        pool.poolMetadata?.decimals
      ) * lpPrice,
    ],
  ];

  return (
    <Accordion title="My Position">
      {MY_POSITIONS.map(([label, balance]) => (
        <ItemStandard
          key={v4()}
          label={label}
          loading={loading}
          content={{
            value: formatDollars(balance),
          }}
        />
      ))}
    </Accordion>
  );
};

export default PoolInfoDetailsMyPosition;
