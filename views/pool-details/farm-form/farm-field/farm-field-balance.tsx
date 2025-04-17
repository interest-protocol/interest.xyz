import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import {
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { useFarmAccount } from '@/hooks/use-farm-account';
import useSrAmmPool from '@/hooks/use-v2-pool';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { FarmFieldProps } from './farm-field.types';

const FarmFieldBalance: FC<FarmFieldProps> = ({ farmMode }) => {
  const { coinsMap, loading } = useCoins();
  const { setValue, control, getValues } = useFormContext<IPoolForm>();
  const { loading: loadingPoolsDetails } = useSrAmmPool(
    getValues('pool.poolAddress')
  );

  const token = useWatch({ control, name: 'lpCoin' });

  const farmAccount = useFarmAccount(token.type);

  const balance =
    (farmMode
      ? farmAccount.data?.amount && BigNumber(String(farmAccount.data.amount))
      : !!token.type && coinsMap[normalizeSuiAddress(token.type)]?.balance) ||
    ZERO_BIG_NUMBER;

  const handleMax = () => {
    const value = balance.minus(
      FixedPointMath.toBigNumber(isAptos(token.type) ? 1 : 0, token.decimals)
    );

    if (isAptos(token.type) && !value.isPositive()) {
      setValue(`lpCoin.value`, '0');
      setValue(`lpCoin.valueBN`, ZERO_BIG_NUMBER);
      return;
    }

    setValue(`lpCoin.valueBN`, value);
    setValue(
      `lpCoin.value`,
      FixedPointMath.toNumber(
        value.decimalPlaces(0, 1),
        token.decimals
      ).toString()
    );
  };

  if (loadingPoolsDetails)
    <Button
      p="2xs"
      gap="0.5rem"
      display="flex"
      color="onSurface"
      variant="outline"
      alignItems="center"
      onClick={handleMax}
      borderColor="transparent"
      nHover={{ bg: 'unset', borderColor: 'primary' }}
      className="loading-balance"
    >
      <Skeleton width="4.5rem" />
    </Button>;

  return (
    <Button
      p="2xs"
      gap="0.5rem"
      display="flex"
      color="onSurface"
      variant="outline"
      alignItems="center"
      onClick={handleMax}
      borderColor="transparent"
      nHover={{ bg: 'unset', borderColor: 'primary' }}
      className="loading-balance"
    >
      <Typography size="small" variant="body" fontSize="xs">
        Balance: {FixedPointMath.toNumber(balance, token.decimals) ?? '--'}
      </Typography>
      {loading && <ProgressIndicator variant="loading" size={12} />}
    </Button>
  );
};

export default FarmFieldBalance;
