import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { formatMoney } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import Accordion from '../components/accordion';
import ItemStandard from '../components/accordion/item-standard';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsBalance: FC = () => {
  const { setValue } = useFormContext<IPoolForm>();
  const { pool, loading } = usePoolDetails();

  useEffect(() => {
    if (!pool || pool.curve != 'stable') return;

    if (loading) return;

    const ratio = pool.tokensAddresses?.map(
      (address, index) =>
        +FixedPointMath.toNumber(
          BigNumber(String(pool.balances?.[index] ?? 0)),
          pool.algorithm === 'curve'
            ? 18
            : (metadata?.[normalizeSuiAddress(address)]?.decimals ?? 8)
        )
    );
    const [token0Balance, token1Balance] = ratio;

    const hasNoLiquidity = token0Balance < 100 && token1Balance < 100;

    setValue('ratio', [
      hasNoLiquidity ? 1 : token1Balance / token0Balance,
      hasNoLiquidity ? 1 : token0Balance / token1Balance,
    ]);
  }, [loading, pool]);

  if (!pool || loading)
    return (
      <Accordion title="Live balance" noBorder>
        <PoolInfoLoading />
      </Accordion>
    );

  const metadata = pool.tokensMetadata?.reduce(
    (acc, curr) => ({ ...acc, [curr.type]: curr }),
    {} as Record<string, AssetMetadata>
  );

  return (
    <Accordion title="Live balance" noBorder={pool.algorithm === 'curve'}>
      {pool.tokensAddresses?.map((address, index) => (
        <ItemStandard
          key={v4()}
          loading={loading}
          label={metadata?.[normalizeSuiAddress(address)]?.symbol ?? ''}
          content={{
            value: `${formatMoney(
              +FixedPointMath.toNumber(
                BigNumber(String(pool.balances?.[index] ?? 0)),
                pool.algorithm === 'curve'
                  ? 18
                  : (metadata?.[normalizeSuiAddress(address)]?.decimals ?? 8)
              ).toFixed(6)
            )} ${metadata?.[normalizeSuiAddress(address)]?.symbol}`,
          }}
        />
      ))}
    </Accordion>
  );
};

export default PoolInfoDetailsBalance;
