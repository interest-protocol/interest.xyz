import { COINS, Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useEffect, useState } from 'react';

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
    // TODO: Check if u can remove this comments/validation
    //if (PRICE_TYPE[symbol])
    fetch(`https://api.mosaic.ag/v1/prices?ids[]=${type}`, {
      method: 'GET',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        'x-api-key': 'tYPtSqDun-w9Yrric2baUAckKtzZh9U0',
      },
    })
      .then((response) => response.json())
      .then(({ data }) => setUSDPrice(data.priceById[type].price))
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
