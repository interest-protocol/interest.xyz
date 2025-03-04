import { COINS, Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useEffect, useState } from 'react';

import { PRICE_TYPE } from '@/constants/prices';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';

const BalanceCard: FC = () => {
  const { coinsMap } = useCoins();
  const [USDPrice, setUSDPrice] = useState(0);
  const defaultCoin = COINS[Network.Porto].APT;

  const type = defaultCoin.type;
  const decimals = defaultCoin.decimals;
  const symbol = defaultCoin.symbol;

  const balance = FixedPointMath.toNumber(
    coinsMap[type]?.balance.isZero()
      ? ZERO_BIG_NUMBER
      : coinsMap[type]?.balance,
    decimals
  );

  useEffect(() => {
    if (PRICE_TYPE[symbol])
      fetch(
        `https://rates-api-staging.up.railway.app/api/fetch-quote?coins=${type}`,
        {
          method: 'GET',
          headers: {
            network: 'MOVEMENT',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setUSDPrice(Number(formatDollars(data[0].price))))
        .catch(() => null);
  }, []);

  return (
    <Box
      my="m"
      gap="xs"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Typography size="small" variant="display">
        {balance}{' '}
        <Box fontSize="Satoshi" as="span">
          {symbol}
        </Box>
      </Typography>
      <Typography size="small" opacity="0.7" variant="label" color="onSurface">
        {formatDollars(
          +BigNumber(balance).times(BigNumber(USDPrice)).toNumber().toFixed(3)
        )}
      </Typography>
    </Box>
  );
};

export default BalanceCard;
