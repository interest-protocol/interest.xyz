import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronDownSVG } from '@/components/svg';

import { SwapForm } from '../../swap.types';
import { AdditionalInfoHeaderProps } from './additional-info.types';

const AdditionalInfoHeader: FC<AdditionalInfoHeaderProps> = ({
  toggle,
  isOpen,
}) => {
  const { control } = useFormContext<SwapForm>();
  const fromSymbol = useWatch({
    control,
    name: 'from.symbol',
  });
  const toSymbol = useWatch({
    control,
    name: 'to.symbol',
  });
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
        1 {fromSymbol} = 42.5411 {toSymbol}{' '}
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
          ($108,905.58)
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
