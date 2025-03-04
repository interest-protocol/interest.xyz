import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { PRICE_TYPE } from '@/constants/prices';
import useExposedCoins from '@/hooks/use-exposed-coins';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';
import { formatDollars, parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';

const label = 'to';

const MAX_COINS = 10;
const DISTANCE_BETWEEN_COINS = 5;
const SIDE_MARGIN = 15;
const TOP_MARGIN = 10;
const RANDOM_OFFSET = 8;

const SwapBackground: FC = () => {
  const { setValue, getValues } = useFormContext();
  const network = useNetwork<Network>();

  const { exposedCoins } = useExposedCoins();

  const onSelect = async (metadata: AssetMetadata) => {
    const [currentToken, opposite] = getValues([label, 'from']);

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
      fetch(
        `https://rates-api-staging.up.railway.app/api/fetch-quote?coins=${metadata.type}`,
        {
          method: 'GET',
          headers: {
            network: 'MOVEMENT',
          },
        }
      )
        .then((response) => response.json())
        .then((data) =>
          setValue(`${label}.usdPrice`, formatDollars(data.price))
        )
        .catch(() => null);
  };

  const coins = exposedCoins.slice(0, MAX_COINS);

  const splitCoinsRandomly = (coins: typeof exposedCoins) => {
    const shuffledCoins = [...coins].sort(() => Math.random() - 0.5);
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
      {leftCoins.map((token, index) => {
        const position = calculatePosition(index, 'left');

        return (
          <Motion
            gap="l"
            key={v4()}
            display="flex"
            cursor="pointer"
            initial="initial"
            whileHover="hover"
            position="absolute"
            animate={{ y: [-5, 5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'mirror',
            }}
            onClick={() => onSelect(parseToMetadata(token as MetadataSources))}
            top={position.top}
            left={position.left}
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
                {token.usd}
              </Typography>
            </Motion>
          </Motion>
        );
      })}
      {rightCoins.map((token, index) => {
        const position = calculatePosition(index, 'right');

        return (
          <Motion
            gap="l"
            key={v4()}
            display="flex"
            cursor="pointer"
            initial="initial"
            whileHover="hover"
            position="absolute"
            animate={{ y: [-5, 5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'mirror',
            }}
            onClick={() => onSelect(parseToMetadata(token as MetadataSources))}
            top={position.top}
            left={position.left}
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
                {token.usd}
              </Typography>
            </Motion>
          </Motion>
        );
      })}
    </Box>
  );
};

export default SwapBackground;
