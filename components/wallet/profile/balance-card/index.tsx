import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { MOVE } from '@/constants/coins';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';

const BalanceCard: FC = () => {
  const { coinsMap } = useCoins();
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
      coinsMap[normalizeSuiAddress(type)]?.balance.isZero()
        ? acc
        : acc.plus(
            coinsMap[normalizeSuiAddress(type)]?.balance ?? ZERO_BIG_NUMBER
          ),
    ZERO_BIG_NUMBER
  );

  return (
    <Box gap="xs" width="100%" display="flex" flexDirection="column">
      <Typography
        size="small"
        variant="body"
        fontFamily="Inter"
        fontSize="1rem"
        fontWeight="500"
        lineHeight="1.3rem"
        color="#949E9E"
        textAlign="center"
      >
        {FixedPointMath.toNumber(balance, MOVE.decimals)}{' '}
        <Box as="span">{MOVE.symbol}</Box>
      </Typography>
    </Box>
  );
};

export default BalanceCard;
