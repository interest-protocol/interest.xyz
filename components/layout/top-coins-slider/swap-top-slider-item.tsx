import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import { SwapBottomMenuItemProps } from '../bottom-menu/bottom-menu.types';

const SwapTopSliderItem: FC<SwapBottomMenuItemProps> = ({
  price,
  symbol,
  iconUri,
  onClick,
}) => {
  const network = useNetwork<Network>();

  return (
    <Box
      gap="xs"
      display="flex"
      cursor="pointer"
      onClick={onClick}
      alignItems="center"
      justifyContent="center"
      width="max-content"
    >
      <TokenIcon
        size="1.5rem"
        withBg
        network={network}
        url={iconUri}
        symbol={symbol}
      />
      <Typography size="medium" variant="title" color="primary">
        {symbol}
      </Typography>
      <Typography
        size="medium"
        variant="title"
        textAlign="left"
        fontWeight="500"
        color="onSurface"
      >
        {price}
      </Typography>
    </Box>
  );
};

export default SwapTopSliderItem;
