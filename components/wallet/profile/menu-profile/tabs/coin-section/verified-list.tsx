import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TOKENS } from '@/constants/coins';
import { parseToMetadata } from '@/utils';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';

import CoinCard from './coin-card';

const VerifiedCoinList: FC = () => {
  const verifiedTokens = TOKENS.flatMap((metadata) =>
    metadata.address && metadata.type
      ? [
          parseToMetadata({
            name: metadata.name,
            symbol: metadata.symbol,
            iconUri: metadata.iconUri,
            address: metadata.address,
            decimals: metadata.decimals,
            projectUri: metadata.projectUri ?? '',
          } as FAMetadata),
          parseToMetadata({
            name: metadata.name,
            type: metadata.type,
            symbol: metadata.symbol,
            iconUri: metadata.iconUri,
            decimals: metadata.decimals,
          } as CoinMetadata),
        ]
      : parseToMetadata(metadata as unknown as CoinMetadata | FAMetadata)
  );

  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <Typography
        color="#fff"
        size="small"
        variant="label"
        fontWeight="500"
        fontFamily="Inter"
        fontSize="0.85rem"
        lineHeight="1.5rem"
        textTransform="uppercase"
      >
        COINS
      </Typography>
      {verifiedTokens.map((token) => (
        <CoinCard key={v4()} token={token} />
      ))}
    </Box>
  );
};
export default VerifiedCoinList;
