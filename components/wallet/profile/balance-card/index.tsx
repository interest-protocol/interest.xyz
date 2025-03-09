import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useEffect, useState } from 'react';

import { MOVE } from '@/constants/coins';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars, parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';

const BalanceCard: FC = () => {
  const { coinsMap } = useCoins();
  const [USDPrice, setUSDPrice] = useState(0);
  const defaultCoins = [
    {
      name: MOVE.name,
      symbol: MOVE.symbol,
      iconUri: MOVE.iconUri,
      address: MOVE.address,
      decimals: MOVE.decimals,
      projectUri: MOVE.projectUri ?? '',
    },
    {
      type: MOVE.type,
      name: MOVE.name,
      symbol: MOVE.symbol,
      iconUri: MOVE.iconUri,
      decimals: MOVE.decimals,
    },
  ].map(parseToMetadata);

  const balance = defaultCoins.reduce(
    (acc, { type }) =>
      coinsMap[type]?.balance.isZero()
        ? acc
        : acc.plus(coinsMap[type]?.balance ?? ZERO_BIG_NUMBER),
    ZERO_BIG_NUMBER
  );

  useEffect(() => {
    fetch(
      `https://rates-api-staging.up.railway.app/api/fetch-quote?coins=0xa`,
      {
        method: 'GET',
        headers: { network: 'MOVEMENT' },
      }
    )
      .then((response) => response.json())
      .then((data) => setUSDPrice(data[0].price))
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
        {FixedPointMath.toNumber(balance, MOVE.decimals)}{' '}
        <Box fontSize="Satoshi" as="span">
          {MOVE.symbol}
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
