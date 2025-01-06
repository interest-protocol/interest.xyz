import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';

import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { PRICE_TYPE } from '@/constants/prices';
import useExposedCoins from '@/hooks/use-exposed-coins';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';

import SwapBottomMenuItem from './bottom-menu-item';
import SwapButtonMenuList from './bottom-menu-list';

const label = 'to';

const SwapBottomMenu = () => {
  const { setValue, getValues } = useFormContext();
  const { exposedCoins } = useExposedCoins();

  const { asPath } = useRouter();

  const onSelect = async (metadata: AssetMetadata) => {
    const [currentToken, opposite] = getValues([label, 'from']);

    if (
      (metadata.standard == TokenStandard.FA
        ? metadata.type
        : COIN_TYPE_TO_FA[metadata.type].toString()) ==
      (opposite.standard == TokenStandard.FA
        ? opposite.type
        : COIN_TYPE_TO_FA[opposite.type].toString())
    )
      return;

    if (
      metadata.standard === opposite.standard &&
      metadata.symbol === opposite.symbol
    ) {
      setValue(label === 'to' ? 'from' : 'to', {
        ...currentToken,
        value: '',
      });
    }

    setValue(label, {
      ...metadata,
      value: '',
      usdPrice: null,
      valueBN: ZERO_BIG_NUMBER,
    });

    if (PRICE_TYPE[metadata.symbol])
      fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
        method: 'POST',
        body: JSON.stringify({ coins: [PRICE_TYPE[metadata.symbol]] }),
        headers: { 'Content-Type': 'application/json', accept: '*/*' },
      })
        .then((response) => response.json())
        .then((data) => setValue(`${label}.usdPrice`, data[0].price))
        .catch(() => null);
  };

  return (
    <Box
      left="0"
      zIndex="9"
      bottom="0"
      width="100vw"
      overflow="hidden"
      position="absolute"
      bg="highestContainer"
      flexDirection="column"
      display={['flex', 'flex', 'flex', 'none', 'none']}
    >
      {asPath === '/' && (
        <Box
          p="s"
          gap="l"
          width="100%"
          display="flex"
          overflowX="scroll"
          alignItems="center"
          scrollbarWidth="none"
          scrollSnapType="x mandatory"
        >
          {exposedCoins.map((token, index) => (
            <Box key={index}>
              <SwapBottomMenuItem
                usdPrice={token.usd}
                symbol={token.symbol}
                iconUri={token.iconUri}
                onClick={() =>
                  onSelect(parseToMetadata(token as MetadataSources))
                }
              />
            </Box>
          ))}
        </Box>
      )}
      <SwapButtonMenuList />
    </Box>
  );
};

export default SwapBottomMenu;
