import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import {
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import useSrAmmPool from '@/hooks/use-sr-amm-pool';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

const Balance: FC = () => {
  const { coinsMap, loading } = useCoins();
  const { setValue, control, getValues } = useFormContext<IPoolForm>();
  const { loading: loadingPoolsDetails } = useSrAmmPool(
    getValues('pool.poolAddress')
  );

  const token = useWatch({ control, name: 'lpCoin' });

  const balance =
    (!!token.type && coinsMap[normalizeSuiAddress(token.type)]?.balance) ||
    ZERO_BIG_NUMBER;

  const handleMax = () => {
    setValue(`lpCoin.locked`, false);

    const value = balance.minus(
      FixedPointMath.toBigNumber(isAptos(token.type) ? 1 : 0, token.decimals)
    );
    setValue(`lpCoin.valueBN`, value);
    setValue(
      `lpCoin.value`,
      FixedPointMath.toNumber(
        value.decimalPlaces(0, 1),
        token.decimals
      ).toString()
    );
  };

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
      {!loadingPoolsDetails ? (
        <Typography size="small" variant="body" fontSize="xs">
          Balance: {FixedPointMath.toNumber(balance, token.decimals) ?? '--'}
        </Typography>
      ) : (
        <Skeleton width="4.5rem" />
      )}

      {loading && <ProgressIndicator variant="loading" size={12} />}
    </Button>
  );
};

export default Balance;
