import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Theme, Typography, useTheme } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import { TokenModalItemProps } from './select-token-modal.types';

const TokenModalItem: FC<TokenModalItemProps> = ({
  isFA,
  symbol,
  iconUri,
  onClick,
  selected,
}) => {
  const network = useNetwork<Network>();
  const { colors } = useTheme() as Theme;
  const [isLoading, setLoading] = useState(false);

  const onSelect = () => {
    if (selected) return;
    onClick();
    setLoading(true);
  };

  return (
    <Box
      p="s"
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
          withBorder
          url={iconUri}
          size="1.3rem"
          rounded
          symbol={symbol}
          network={network}
        />
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography
            size="medium"
            variant="title"
            overflow="hidden"
            whiteSpace="nowrap"
            fontSize="0.87375rem"
            textOverflow="ellipsis"
            maxWidth={['unset', '5rem']}
          >
            {symbol}
          </Typography>
          <Typography
            size="medium"
            variant="label"
            color="#9CA3AF"
            fontWeight="400"
            fontFamily="Inter"
            overflow="hidden"
            whiteSpace="nowrap"
            fontSize="0.87375rem"
            textOverflow="ellipsis"
            maxWidth={['unset', '10rem']}
          >
            {isFA ? 'Fungible Asset' : 'Coin'}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="flex-end" flexDirection="column">
        <Typography
          size="medium"
          variant="title"
          fontWeight="400"
          fontFamily="Inter"
          overflow="hidden"
          whiteSpace="nowrap"
          fontSize="0.87375rem"
          textOverflow="ellipsis"
          maxWidth={['unset', '5rem']}
        >
          0.00
        </Typography>
        <Typography
          size="medium"
          variant="label"
          color="#9CA3AF"
          fontWeight="400"
          fontFamily="Inter"
          overflow="hidden"
          whiteSpace="nowrap"
          fontSize="0.87375rem"
          textOverflow="ellipsis"
          maxWidth={['unset', '5rem']}
        >
          $0
        </Typography>
      </Box>
    </Box>
  );
};

export default TokenModalItem;
