import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { RateDownSVG, RateUpSVG } from '@/components/svg';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import { Token } from '@/interface';
import { formatDollars } from '@/utils';

import BottomMenuItem from './swap-top-slider-item';

const TopCoinItem: FC<{
  token: Token;
  handleTokenSelect: () => void;
}> = ({ token, handleTokenSelect }) => {
  const { data: price } = useCoinsPrice(token.type ?? token.address.toString());

  return (
    <Box gap="s" display="flex">
      <Box>
        <BottomMenuItem
          symbol={token.symbol}
          iconUri={token.iconUri}
          onClick={handleTokenSelect}
          price={formatDollars((price?.length && price[0].price) ?? 0)}
        />
      </Box>
      <Box gap="xs" display="flex" alignItems="center" justifyContent="center">
        {!!price?.length &&
        price[0].priceChange24HoursPercentage &&
        price[0].priceChange24HoursPercentage < 1 ? (
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
          color={
            price?.length &&
            price[0].priceChange24HoursPercentage &&
            price[0].priceChange24HoursPercentage < 1
              ? '#E53E3E'
              : '#16A24A'
          }
        >
          {(
            (price?.length && price[0].priceChange24HoursPercentage) ??
            0
          ).toFixed(2)}
          %
        </Typography>
      </Box>
    </Box>
  );
};

export default TopCoinItem;
