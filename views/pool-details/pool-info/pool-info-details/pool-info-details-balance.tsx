import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import useSrAmmPool from '@/hooks/use-sr-amm-pool';
import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';

import ItemStandard from '../components/accordion/item-standard';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsBalance: FC = () => {
  const { query } = useRouter();
  const { pool, loading } = useSrAmmPool(String(query.address));

  if (!pool || loading) return <PoolInfoLoading />;

  return (
    <>
      {[
        { ...pool.metadataX, balance: pool.balanceX },
        { ...pool.metadataY, balance: pool.balanceY },
      ].map(({ name, symbol, decimals, balance }) => (
        <ItemStandard
          key={v4()}
          label={name}
          loading={loading}
          content={`${formatMoney(
            FixedPointMath.toNumber(BigNumber(String(balance)), decimals)
          )} ${symbol}`}
        />
      ))}
    </>
  );
};

export default PoolInfoDetailsBalance;
