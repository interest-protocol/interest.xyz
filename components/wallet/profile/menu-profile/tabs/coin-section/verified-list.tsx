import { FC } from 'react';
import { v4 } from 'uuid';

import { TOKENS } from '@/constants/coins';
import { parseToMetadata } from '@/utils';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';

import CoinCard from './coin-card';

const VerifiedCoinList: FC = () => {
  const verifiedTokens = TOKENS.map((token) =>
    parseToMetadata(token as unknown as CoinMetadata | FAMetadata)
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
