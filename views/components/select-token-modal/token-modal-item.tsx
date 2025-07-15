import {
  Network,
  normalizeSuiAddress,
} from '@interest-protocol/interest-aptos-v2';
import { Box, Theme, Typography, useTheme } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { TokenIcon } from '@/components';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { formatDollars, formatMoney, ZERO_BIG_NUMBER } from '@/utils';

import { TokenModalItemProps } from './select-token-modal.types';

const TokenModalItem: FC<TokenModalItemProps> = ({
  isFA,
  token,
  onClick,
  selected,
}) => {
  const network = useNetwork<Network>();
  const { coinsMap } = useCoins();
  const { colors } = useTheme() as Theme;
  const [isLoading, setLoading] = useState(false);

  const { data: price } = useCoinsPrice(token.type);

  const coin = coinsMap[normalizeSuiAddress(token.type)];

  const balance = FixedPointMath.toNumber(
    coin?.balance ?? ZERO_BIG_NUMBER,
    coin?.decimals ?? token.decimals
  );

  const onSelect = () => {
    if (selected) return;
    onClick();
    setLoading(true);
  };

  return (
    <Box
      p="12px"
      display="flex"
      color="textSoft"
      cursor="pointer"
      borderRadius="xs"
      onClick={onSelect}
      alignItems="center"
      position="relative"
      justifyContent="space-between"
      transition="background 500ms ease-in-out"
      bg={selected ? `${colors.primary}14` : 'unset'}
      nHover={{ bg: `${colors.primary}14`, borderColor: 'primary' }}
    >
      {isLoading && (
        <Box position="absolute" top="0" right="0" left="0" bottom="0">
          <Skeleton height="100%" />
        </Box>
      )}
      <Box display="flex" alignItems="center" gap="s">
        <TokenIcon
          withBg
          url={token.iconUri}
          size="1.52rem"
          rounded={!isFA}
          symbol={token.symbol}
          network={network}
        />
        <Box display="flex" flexDirection="column">
          <Typography
            size="medium"
            variant="body"
            fontWeight="500"
            overflow="hidden"
            fontFamily="Inter"
            whiteSpace="nowrap"
            fontSize="0.875rem"
            lineHeight="1.25rem"
            textOverflow="ellipsis"
          >
            {token.symbol}
          </Typography>
          <Typography
            size="medium"
            variant="body"
            color="#9CA3AF"
            fontWeight="400"
            overflow="hidden"
            fontFamily="Inter"
            whiteSpace="nowrap"
            fontSize="0.8rem"
            lineHeight="1.25rem"
            textOverflow="ellipsis"
          >
            {isFA ? 'Fungible Asset' : 'Coin'}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="flex-end" flexDirection="column">
        <Typography
          size="medium"
          variant="body"
          fontWeight="500"
          overflow="hidden"
          fontFamily="Inter"
          whiteSpace="nowrap"
          fontSize="0.875rem"
          lineHeight="1.25rem"
          textOverflow="ellipsis"
        >
          {formatMoney(balance, 2)}
        </Typography>
        <Typography
          size="medium"
          variant="body"
          color="#9CA3AF"
          fontWeight="400"
          fontFamily="Inter"
          whiteSpace="nowrap"
          fontSize="0.875rem"
          lineHeight="1.25rem"
        >
          {price?.length && price[0].price
            ? formatDollars(
                +BigNumber(balance)
                  .times(BigNumber(price[0].price))
                  .toNumber()
                  .toFixed(3)
              )
            : '--'}
        </Typography>
      </Box>
    </Box>
  );
};

export default TokenModalItem;
