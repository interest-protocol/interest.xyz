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
    <>
      {verifiedTokens.map((token) => (
        <CoinCard key={v4()} token={token} />
      ))}
    </>
  );
};
export default VerifiedCoinList;
