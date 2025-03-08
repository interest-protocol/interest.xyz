import { FC } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import { v4 } from 'uuid';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { TOKENS } from '@/constants/coins';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { parseToMetadata } from '@/utils';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';

import NoCoin from '../no-coin';
import CoinCard from './coin-card';
import Collapse from './coin-card/collapse';

const UnverifiedCoinList: FC = () => {
  const { coins } = useCoins();

  const isHideLPToken = useReadLocalStorage<boolean>(
    `${LOCAL_STORAGE_VERSION}-movement-dex-hide-lp-token`
  );

  const tokenTypes = TOKENS.map(
    (token) =>
      parseToMetadata(token as unknown as CoinMetadata | FAMetadata).type
  );

  const unverifiedCoins = coins.filter(({ type, symbol }) => {
    const isNotInTokens = !tokenTypes.includes(type);
    const isNotLPToken = isHideLPToken
      ? !symbol.toLowerCase().includes('v2-lp')
      : true;
    return isNotInTokens && isNotLPToken;
  });

  return (
    <Collapse title={`${unverifiedCoins.length} unverified`}>
      {unverifiedCoins.length ? (
        unverifiedCoins.map((coin) => <CoinCard key={v4()} token={coin} />)
      ) : (
        <NoCoin />
      )}
    </Collapse>
  );
};

export default UnverifiedCoinList;
