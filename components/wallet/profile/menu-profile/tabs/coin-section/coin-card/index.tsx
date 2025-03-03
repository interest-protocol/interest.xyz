import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';

import { RateDownSVG, RateUpSVG } from '@/components/svg';
import TokenIcon from '@/components/token-icon';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';

import { CoinCardProps } from '../../../user-info.types';
import CardWrapper from './card-wrapper';

const CoinCard: FC<CoinCardProps> = ({ token }) => {
  const network = useNetwork<Network>();
  const { coinsMap } = useCoins();

  const symbol = token.symbol;
  const decimals = token.decimals;

  const coin = coinsMap[token.type];

  const balance = FixedPointMath.toNumber(
    coin?.balance ?? ZERO_BIG_NUMBER,
    coin?.decimals ?? decimals
  );

  return (
    <CardWrapper
      TokenIcon={
        <TokenIcon
          withBg
          size="1.5rem"
          symbol={symbol}
          network={network}
          url={token.iconUri}
          rounded={token.standard === TokenStandard.COIN}
        />
      }
      symbol={symbol}
      supportingText={
        coin?.usdPrice
          ? formatDollars(
              +BigNumber(balance)
                .times(BigNumber(coin.usdPrice))
                .toNumber()
                .toFixed(3)
            )
          : '--'
      }
    >
      <Box display="flex" gap="s" alignItems="center">
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-start"
        >
          <Typography size="large" variant="label" lineHeight="1.5rem">
            {balance}
            <Box fontSize="Satoshi" as="span">
              {symbol}
            </Box>
          </Typography>
          {!!coin?.usdPrice24Change && (
            <Box
              gap="xs"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {coin.usdPrice24Change < 1 ? (
                <RateDownSVG
                  width="1rem"
                  height="1rem"
                  maxHeight="100%"
                  maxWidth="100%"
                />
              ) : (
                <RateUpSVG
                  width="1rem"
                  height="1rem"
                  maxHeight="100%"
                  maxWidth="100%"
                />
              )}
              <Typography
                size="large"
                opacity={0.7}
                variant="label"
                color="onSurface"
                fontSize="0.625rem"
                lineHeight="1rem"
              >
                {coin.usdPrice24Change}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default CoinCard;
