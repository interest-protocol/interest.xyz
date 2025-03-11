import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { RateDownSVG, RateUpSVG } from '@/components/svg';
import useExposedCoins from '@/hooks/use-exposed-coins';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';

import BottomMenuItem from './swap-top-slider-item';

const label = 'to';

const SwapTopSlider: FC = () => {
  const { exposedCoins } = useExposedCoins();
  const { setValue, getValues } = useFormContext();

  const handleTokenSelect = (token: MetadataSources) =>
    onSelect(parseToMetadata(token));

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
      valueBN: ZERO_BIG_NUMBER,
    });
  };

  console.log({ exposedCoins });

  return (
    <Box
      px="m"
      display={
        exposedCoins?.length ? ['flex', 'flex', 'flex', 'none', 'none'] : 'none'
      }
    >
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
        {exposedCoins?.map((token, index) => (
          <Box gap="s" key={index} display="flex">
            <Box>
              <BottomMenuItem
                symbol={token.symbol}
                price={token.usdPrice}
                iconUri={token.iconUri}
                onClick={() => handleTokenSelect(token)}
              />
            </Box>
            <Box
              gap="xs"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {!!token.usdPrice24Change && token.usdPrice24Change < 1 ? (
                <RateDownSVG
                  width="1rem"
                  height="1rem"
                  maxHeight="1rem"
                  maxWidth="1rem"
                />
              ) : (
                <RateUpSVG
                  width="1rem"
                  height="1rem"
                  maxHeight="1rem"
                  maxWidth="1rem"
                />
              )}
              <Typography
                size="large"
                variant="label"
                lineHeight="1rem"
                fontSize="0.625rem"
                color={token.usdPrice24Change! < 1 ? '#E53E3E' : '#16A24A'}
              >
                {(token.usdPrice24Change! * 100).toFixed(2)}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SwapTopSlider;
