import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { AsteriskSVG } from '@/components/svg';
import useExposedCoins from '@/hooks/use-exposed-coins';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';

import BottomMenuItem from './swap-top-slider-item';

const label = 'to';

const SwapTopSlider: FC = () => {
  const { setValue, getValues } = useFormContext();
  const { exposedCoins } = useExposedCoins();

  const onSelect = async (metadata: AssetMetadata) => {
    const [currentToken, opposite] = getValues([label, 'from']);

    if (metadata.type == opposite.type) return;

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

    // TODO: Check if u can remove this comments/validation
    //if (PRICE_TYPE[metadata.symbol])
    fetch(`https://api.mosaic.ag/v1/prices?ids[]=${metadata.type}`, {
      method: 'GET',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        'x-api-key': 'tYPtSqDun-w9Yrric2baUAckKtzZh9U0',
      },
    })
      .then((response) => response.json())
      .then(({ data }) =>
        setValue(`${label}.usdPrice`, data.priceById[metadata.type].price)
      )
      .catch(() => null);
  };

  return (
    <Box px="m" display={['flex', 'flex', 'flex', 'none', 'none']}>
      <Box
        py="s"
        gap="l"
        width="100%"
        display="flex"
        overflowX="scroll"
        alignItems="center"
        scrollbarWidth="none"
        backdropFilter="blur(40px)"
        scrollSnapType="x mandatory"
        WebkitBackdropFilter="blur(40px)"
      >
        {exposedCoins.map((token, index) => (
          <>
            <Box key={index}>
              <BottomMenuItem
                usdPrice={token.usd}
                symbol={token.symbol}
                iconUri={token.iconUri}
                onClick={() =>
                  onSelect(parseToMetadata(token as MetadataSources))
                }
              />
            </Box>
            {index !== exposedCoins.length - 1 && (
              <Box
                alignItems="center"
                display="inline-flex"
                flexDirection="column"
                justifyContent="center"
              >
                <AsteriskSVG maxHeight="1rem" maxWidth="1rem" width="1rem" />
              </Box>
            )}
          </>
        ))}
      </Box>
    </Box>
  );
};

export default SwapTopSlider;
