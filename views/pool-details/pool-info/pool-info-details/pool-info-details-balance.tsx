import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';

import { usePoolDetails } from '../../pool-details.context';
import Accordion from '../components/accordion';
import ItemStandard from '../components/accordion/item-standard';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsBalance: FC = () => {
  const { pool, loading } = usePoolDetails();

  if (!pool || loading) return <PoolInfoLoading />;

  return (
    <Accordion title="Live balance" noBorder={pool.algorithm === 'curve'}>
      {pool.tokensMetadata?.map(({ name, symbol, decimals }, index) => (
        <ItemStandard
          key={v4()}
          label={name}
          loading={loading}
          content={`${formatMoney(
            FixedPointMath.toNumber(
              BigNumber(String(pool.balances?.[index] ?? 0)),
              pool.algorithm === 'curve' ? 18 : decimals
            )
          )} ${symbol}`}
        />
      ))}
    </Accordion>
  );
};

export default PoolInfoDetailsBalance;
