import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';

import { usePoolDetails } from '../../pool-details.context';
import ItemStandard from '../components/accordion/item-standard';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsBalance: FC = () => {
  const { pool, loading } = usePoolDetails();

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
