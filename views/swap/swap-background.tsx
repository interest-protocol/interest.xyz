import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { PRICE_TYPE } from '@/constants/prices';
import useExposedCoins from '@/hooks/use-exposed-coins';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';

const label = 'to';

const POSITIONS = [
  [10, 10],
  [50, 15],
  [5, 50],
  [15, 85],
  [80, 80],
  [70, 50],
];

const SwapBackground: FC = () => {
  const { setValue, getValues } = useFormContext();
  const network = useNetwork<Network>();

  const { exposedCoins } = useExposedCoins();

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
      flex="1"
      mt="5rem"
      position="absolute"
      display={['none', 'none', 'none', 'block', 'block']}
    >
      {exposedCoins.map((token) => {
        const size = Math.random() * 0.5 + 0.75;

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
            top={`calc(${POSITIONS[~~(POSITIONS.length * Math.random())][0]}vh + ${Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)}rem)`}
            left={`calc(${POSITIONS[~~(POSITIONS.length * Math.random())][1]}vw + ${Math.random() * 10 * (Math.random() > 0.5 ? 1 : -1)}rem)`}
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
                width={`calc(3rem * ${size})`}
                height={`calc(3rem * ${size})`}
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
