import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronDownSVG } from '@/components/svg';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import { formatDollars, formatMoney } from '@/utils';

import { SwapForm } from '../../swap.types';
import { AdditionalInfoHeaderProps } from './additional-info.types';

const AdditionalInfoHeader: FC<AdditionalInfoHeaderProps> = ({
  toggle,
  isOpen,
  amount,
}) => {
  const { control } = useFormContext<SwapForm>();
  const fromSymbol = useWatch({
    control,
    name: 'from.symbol',
  });
  const to = useWatch({
    control,
    name: 'to',
  });

  const { data: price } = useCoinsPrice(to.type);
  return (
    <Box
      display="flex"
      cursor="pointer"
      onClick={toggle}
      justifyContent="space-between"
    >
      <Typography
        variant="body"
        size="small"
        fontWeight="400"
        fontSize="0.875rem"
        lineHeight="1.125rem"
        fontFamily="Inter"
        letterSpacing="-0.035rem"
        color="#B8C4C4"
      >
        1 {fromSymbol} = {`${formatMoney(Number(amount))} ${to.symbol} `}
        <Typography
          variant="body"
          size="small"
          fontWeight="400"
          fontSize="0.875rem"
          lineHeight="1.125rem"
          letterSpacing="-0.035rem"
          fontFamily="Inter"
          as="span"
          color="#949E9E"
        >
          (
          {amount != '--'
            ? price?.length && price[0].price
              ? formatDollars(
                  +BigNumber(amount)
                    .times(BigNumber(price[0].price))
                    .toNumber()
                    .toFixed(3)
                )
              : '--'
            : '--'}
          )
        </Typography>
      </Typography>
      <Motion
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Button isIcon variant="text" color="#949E9E" p="unset">
          <ChevronDownSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
        </Button>
      </Motion>
    </Box>
  );
};

export default AdditionalInfoHeader;
