import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import { SwapBottomMenuItemProps } from './bottom-menu.types';

const SwapBottomMenuItem: FC<SwapBottomMenuItemProps> = ({
  symbol,
  iconUri,
  onClick,
  usdPrice,
}) => {
  const network = useNetwork<Network>();

  return (
    <Box
      gap="xs"
      display="flex"
      onClick={onClick}
      alignItems="center"
      justifyContent="center"
    >
      <TokenIcon
        size="0.8rem"
        withBg
        network={network}
        url={iconUri}
        symbol={symbol}
      />
      <Typography size="large" variant="body" color="primary" fontWeight="bold">
        {symbol}
      </Typography>
      <Box>
        <Typography
          size="small"
          variant="label"
          textAlign="left"
          color="onSurface"
        >
          {usdPrice}
        </Typography>
      </Box>
    </Box>
  );
};

export default SwapBottomMenuItem;
