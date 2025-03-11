import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import useExposedCoins from '@/hooks/use-exposed-coins';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { formatDollars, parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';

import {
  DISTANCE_BETWEEN_COINS,
  MAX_COINS,
  RANDOM_OFFSET,
  SIDE_MARGIN,
  TOP_MARGIN,
} from './swap-background.data';

const SwapBackground = memo(() => {
  const network = useNetwork<Network>();
  const { exposedCoins } = useExposedCoins();
  const { setValue, getValues } = useFormContext();

  const onSelect = async (metadata: AssetMetadata) => {
    const [currentToken, opposite] = getValues(['to', 'from']);

    if (
      metadata.standard === opposite.standard &&
      metadata.symbol === opposite.symbol
    )
      setValue('from', {
        ...currentToken,
        value: '',
      });

    setValue('to', {
      ...metadata,
      value: '',
      usdPrice: null,
      valueBN: ZERO_BIG_NUMBER,
    });
  };

  const coins = exposedCoins?.slice(0, MAX_COINS) ?? [];

  const splitCoinsRandomly = (coins: typeof exposedCoins) => {
    const shuffledCoins = [...(coins ?? [])].sort(() => Math.random() - 0.5);
    const half = Math.ceil(shuffledCoins.length / 2);
    const leftCoins = shuffledCoins.slice(0, half);
    const rightCoins = shuffledCoins.slice(half);
    return { leftCoins, rightCoins };
  };

  const { leftCoins, rightCoins } = splitCoinsRandomly(coins);

  const calculatePosition = (index: number, side: 'left' | 'right') => {
    const baseTop = TOP_MARGIN + index * DISTANCE_BETWEEN_COINS * 3;
    const baseLeft = side === 'left' ? SIDE_MARGIN : 100 - SIDE_MARGIN;

    const randomTopOffset = (Math.random() - 0.5) * RANDOM_OFFSET;
    const randomLeftOffset = (Math.random() - 0.5) * RANDOM_OFFSET;

    return {
      top: `${baseTop + randomTopOffset}vh`,
      left: `${baseLeft + randomLeftOffset}vw`,
    };
  };

  return (
    <Box
      flex="1"
      mt="6rem"
      position="absolute"
      display={['none', 'none', 'none', 'block', 'block']}
    >
      {leftCoins.map((token, index) => (
        <Motion
          gap="l"
          key={v4()}
          display="flex"
          cursor="pointer"
          initial="initial"
          whileHover="hover"
          position="absolute"
          animate={{ y: [-5, 5] }}
          top={calculatePosition(index, 'left').top}
          left={calculatePosition(index, 'left').left}
          onClick={() => onSelect(parseToMetadata(token as MetadataSources))}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
        >
          <Motion
            scale="1"
            filter="blur(10px)"
            variants={{
              initial: { y: 0 },
              hover: {
                scale: [1, 1.25],
                filter: 'blur(0px)',
                transition: { duration: 0.3 },
              },
            }}
          >
            <Motion
              borderRadius="50%"
              width="3rem"
              height="3rem"
              animate={{ rotate: ['-15deg', '15deg'] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
            >
              <TokenIcon
                withBg
                network={network}
                url={token.iconUri}
                symbol={token.symbol}
              />
            </Motion>
          </Motion>
          <Motion
            variants={{
              hover: { scale: 1 },
              initial: { scale: 0 },
            }}
          >
            <Typography
              size="large"
              variant="body"
              color="primary"
              fontWeight="bold"
            >
              {token.symbol}
            </Typography>
            <Typography size="small" variant="label" color="onSurface">
              {formatDollars(token.usdPrice!)}
            </Typography>
          </Motion>
        </Motion>
      ))}
      {rightCoins.map((token, index) => (
        <Motion
          gap="l"
          key={v4()}
          display="flex"
          cursor="pointer"
          initial="initial"
          whileHover="hover"
          position="absolute"
          animate={{ y: [-5, 5] }}
          top={calculatePosition(index, 'right').top}
          left={calculatePosition(index, 'right').left}
          onClick={() => onSelect(parseToMetadata(token as MetadataSources))}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
          }}
        >
          <Motion
            scale="1"
            filter="blur(10px)"
            variants={{
              initial: { y: 0 },
              hover: {
                scale: [1, 1.25],
                filter: 'blur(0px)',
                transition: { duration: 0.3 },
              },
            }}
          >
            <Motion
              borderRadius="50%"
              width="3rem"
              height="3rem"
              animate={{ rotate: ['-15deg', '15deg'] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
            >
              <TokenIcon
                withBg
                network={network}
                url={token.iconUri}
                symbol={token.symbol}
              />
            </Motion>
          </Motion>
          <Motion
            variants={{
              hover: { scale: 1 },
              initial: { scale: 0 },
            }}
          >
            <Typography
              size="large"
              variant="body"
              color="primary"
              fontWeight="bold"
            >
              {token.symbol}
            </Typography>
            <Typography size="small" variant="label" color="onSurface">
              {formatDollars(token.usdPrice!)}
            </Typography>
          </Motion>
        </Motion>
      ))}
    </Box>
  );
});

SwapBackground.displayName = SwapBackground.name;

export default SwapBackground;
