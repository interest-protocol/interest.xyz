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
      border="1px solid"
      onClick={onSelect}
      alignItems="center"
      position="relative"
      justifyContent="space-between"
      transition="background 500ms ease-in-out"
      bg={selected ? `${colors.primary}14` : 'unset'}
      borderColor={selected ? 'primary' : 'outlineVariant'}
      nHover={{ bg: `${colors.primary}14`, borderColor: 'primary' }}
    >
      {isLoading && (
        <Box position="absolute" top="0" right="0" left="0" bottom="0">
          <Skeleton height="100%" />
        </Box>
      )}
      <Box display="flex" alignItems="center" gap="xs">
        <TokenIcon
          withBg
          url={iconUri}
          size="1.3rem"
          rounded={!isFA}
          symbol={symbol}
          network={network}
        />
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography
            size="medium"
            variant="title"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            maxWidth={['unset', '5rem']}
          >
            {symbol}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TokenModalItem;
