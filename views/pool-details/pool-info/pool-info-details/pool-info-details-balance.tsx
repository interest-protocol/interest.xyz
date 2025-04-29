import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { formatMoney } from '@/utils';

import { usePoolDetails } from '../../pool-details.context';
import Accordion from '../components/accordion';
import ItemStandard from '../components/accordion/item-standard';
import PoolInfoLoading from '../pool-info-loading';

const PoolInfoDetailsBalance: FC = () => {
  const { pool, loading } = usePoolDetails();

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

  console.log({ metadata });

  return (
    <Accordion title="Live balance" noBorder={pool.algorithm === 'curve'}>
      {pool.tokensAddresses?.map((address, index) => (
        <ItemStandard
          key={v4()}
          loading={loading}
          label={metadata?.[normalizeSuiAddress(address)]?.symbol ?? ''}
          content={`${formatMoney(
            +FixedPointMath.toNumber(
              BigNumber(String(pool.balances?.[index] ?? 0)),
              pool.algorithm === 'curve'
                ? 18
                : (metadata?.[normalizeSuiAddress(address)]?.decimals ?? 8)
            ).toFixed(6)
          )} ${metadata?.[normalizeSuiAddress(address)]?.symbol}`}
        />
      ))}
    </Accordion>
  );
};

export default PoolInfoDetailsBalance;
