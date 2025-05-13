import { VolatilePool } from '@interest-protocol/interest-aptos-curve';
import { Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { formatDollars } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { PoolOption } from '../../pool-details.types';
import { PoolFieldsProps } from './pool-field.types';

const TokenInputDollar: FC<PoolFieldsProps> = ({ poolOptionView, index }) => {
  const { getValues, control } = useFormContext<IPoolForm>();
  const { pool, loading } = usePoolDetails();

  if (loading) return;
  const isDeposit = poolOptionView === PoolOption.Deposit;

  const poolExtraData = pool?.poolExtraData as unknown as VolatilePool;

  const fieldName: `tokenList.${number}` | 'lpCoin' = isDeposit
    ? `tokenList.${index}`
    : 'lpCoin';
  const token = getValues(fieldName);

  const prices = Object.entries(poolExtraData?.prices).map(([key, value]) => ({
    address: key,
    ...value,
  }));

  console.log(index, token?.type, '>>>check', prices[index].price);

  return (
    <Typography
      size="small"
      variant="label"
      textAlign="right"
      color="onSurface"
    >
      {token?.value
        ? formatDollars(
            FixedPointMath.toNumber(
              BigNumber(String(prices[index].price), 18),
              18
            ) * +token?.value
          )
        : '-- USD'}{' '}
    </Typography>
  );
};

export default TokenInputDollar;
