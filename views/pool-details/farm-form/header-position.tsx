import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FARMS_BY_LP } from '@/constants';
import { useFarmAccount } from '@/hooks/use-farm-account';
import { useLPCoinPrice } from '@/hooks/use-lp-coin-price';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';
import HeaderInfoLine from '@/views/pools/header/header-info-line';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../pool-details.context';

const HeaderPosition: FC = () => {
  const { coinsMap } = useCoins();
  const { pool, loading: poolLoading } = usePoolDetails();

  const poolAddress = pool?.poolAddress;

  const { data: lpPriceCustom, loading: lpLoading } =
    useLPCoinPrice(poolAddress);
  const { getValues } = useFormContext<IPoolForm>();

  const { data: farmAccount } = useFarmAccount(poolAddress!);

  const lpPrice = lpPriceCustom?.lpPrice || 0;

  const lpToken = coinsMap[getValues('lpCoin.type')] ?? ZERO_BIG_NUMBER;

  const stakedBalance = farmAccount?.amount
    ? BigNumber(String(farmAccount.amount))
    : ZERO_BIG_NUMBER;

  const loading = lpLoading || poolLoading;

  return (
    <Box
      mb="m"
      gap="m"
      width="100%"
      mx="auto"
      maxWidth="65rem"
      display="grid"
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr']}
    >
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
      {poolAddress && FARMS_BY_LP[poolAddress] && (
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
              : '0.00'
          }
        />
      )}
    </Box>
  );
};

export default HeaderPosition;
