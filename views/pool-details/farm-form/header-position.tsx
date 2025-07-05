import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useFarmAccount } from '@/hooks/use-farm-account';
import { useLPCoinsPrice } from '@/hooks/use-lp-coin-price';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';
import HeaderInfoLine from '@/views/pools/header/header-info-line';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../pool-details.context';

const HeaderPosition: FC = () => {
  const { coinsMap } = useCoins();
  const { pool, loading: poolLoading } = usePoolDetails();

  const { data: lpPriceCustom, loading: lpLoading } = useLPCoinsPrice(
    pool?.poolAddress
  );
  const { getValues } = useFormContext<IPoolForm>();

  const farmAccount = useFarmAccount(getValues('lpCoin.type'));

  const lpPrice = lpPriceCustom?.lpPrice || 0;

  const lpToken = coinsMap[getValues('lpCoin.type')] ?? ZERO_BIG_NUMBER;

  const stakedBalance = farmAccount.data?.amount
    ? BigNumber(String(farmAccount.data.amount))
    : ZERO_BIG_NUMBER;

  const loading = lpLoading || poolLoading;

  return (
    <Box mb="m" gap="m" width="100%" mx="auto" maxWidth="65rem" display="flex">
      <HeaderInfoLine
        isLoading={loading}
        title="Wallet"
        value={
          lpPriceCustom && pool
            ? formatDollars(
                FixedPointMath.toNumber(
                  lpToken.balance,
                  pool.poolMetadata?.decimals
                ) * lpPrice
              )
            : '0.00'
        }
      />
      <HeaderInfoLine
        isLoading={loading}
        title="Farm"
        value={
          lpPriceCustom && pool
            ? formatDollars(
                FixedPointMath.toNumber(
                  stakedBalance,
                  pool.poolMetadata?.decimals
                ) * lpPrice
              )
            : '10.00'
        }
      />
    </Box>
  );
};

export default HeaderPosition;
