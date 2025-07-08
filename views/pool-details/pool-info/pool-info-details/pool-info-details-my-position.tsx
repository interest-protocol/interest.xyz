import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { useFarmAccount } from '@/hooks/use-farm-account';
import { useLPCoinPrice } from '@/hooks/use-lp-coin-price';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import Accordion from '../components/accordion';
import ItemStandard from '../components/accordion/item-standard';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsMyPosition: FC = () => {
  const { coinsMap } = useCoins();
  const { pool, loading } = usePoolDetails();
  const { data: lpPriceCustom, loading: lpLoading } = useLPCoinPrice(
    pool?.poolAddress
  );
  const { getValues } = useFormContext<IPoolForm>();

  const farmAccount = useFarmAccount(getValues('lpCoin.type'));

  const lpPrice = lpPriceCustom?.lpPrice || 0;
  const lpBalance =
    coinsMap[getValues('lpCoin.type')]?.balance ?? ZERO_BIG_NUMBER;

  const stakedBalance = farmAccount.data?.amount
    ? BigNumber(String(farmAccount.data.amount))
    : ZERO_BIG_NUMBER;

  if (!pool || loading || lpLoading)
    return (
      <Accordion title="My Position" noBorder>
        <PoolInfoLoading />
      </Accordion>
    );

  const MY_POSITIONS: ReadonlyArray<[string, number]> = [
    [
      'Wallet',
      FixedPointMath.toNumber(lpBalance, pool.poolMetadata?.decimals) * lpPrice,
    ],
    [
      'Farm',
      FixedPointMath.toNumber(stakedBalance, pool.poolMetadata?.decimals) *
        lpPrice,
    ],
    [
      'Total',
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
          loading={loading || isNaN(balance)}
          content={{
            value: formatDollars(balance),
          }}
        />
      ))}
    </Accordion>
  );
};

export default PoolInfoDetailsMyPosition;
