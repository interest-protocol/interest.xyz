import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapSVG } from '@/components/svg';
import ArrowNarrowDown from '@/components/svg/arrow-narrow-down';

import { SwapFlipTokenProps } from './swap-flip-token.types';

const SwapFlipToken: FC<SwapFlipTokenProps> = ({ type }) => {
  const form = useFormContext();

  const { setValue, control } = form;

  const to = useWatch({ control, name: 'to' });
  const from = useWatch({ control, name: 'from' });
  const swapping = useWatch({ control, name: 'swapping' });

  const flipToken = () => {
    if (swapping) return;
    const tmpTo = to;
    const tmpFrom = from;

    setValue('to', { ...tmpFrom, value: '' });
    setValue('from', { ...tmpTo, value: '' });
  };

  return (
    <Button
      isIcon
      p="xs"
      variant="text"
      bg="#030712"
      width="2rem"
      height="2rem"
      color="onSurface"
      borderRadius="0.75rem"
      onClick={flipToken}
      nHover={{ bg: 'lowContainer' }}
      disabled={(!to && !from) || swapping}
    >
      {type == 'swap' ? (
        <ArrowNarrowDown maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
      ) : (
        <SwapSVG maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
      )}
    </Button>
  );
};

export default SwapFlipToken;
