import { Box } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useEventListener from '@/hooks/use-event-listener';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';
import { TokenField } from '@/views/pool-create/select-coins/input/token-field';

import { InputProps } from './input.types';
import InputQuoteMaxButton from './input-quote-max-button';
import InputTokenMaxButton from './input-token-max-button';
import QuoteBalance from './quote-balance';
import SelectToken from './select-token';
import TokenBalance from './token-balance';
import QuoteInputDollar from './token-input-dollar';

const Input: FC<InputProps> = ({ label }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<ICreateTokenForm>();

  const handleSetMobile = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(max-width: 26.875rem)').matches;
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetMobile, true);

  return (
    <Box
      width="100%"
      display=" flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <TokenField
        active
        status={
          label == 'quote'
            ? errors.pool?.quoteValue && 'error'
            : errors.pool?.tokenValue && 'error'
        }
        supportingText={
          label == 'quote'
            ? errors.pool?.quoteValue?.message
            : errors.pool?.tokenValue?.message
        }
        opacity="0.7"
        placeholder="--"
        variant="outline"
        textAlign="right"
        Bottom={<QuoteInputDollar />}
        TokenIcon={<SelectToken label={label} isMobile={isMobile} />}
        Balance={label === 'token' ? <TokenBalance /> : <QuoteBalance />}
        ButtonMax={
          label === 'token' ? <InputTokenMaxButton /> : <InputQuoteMaxButton />
        }
        {...register(`pool.${label}Value`, {
          onChange: (v: ChangeEvent<HTMLInputElement>) => {
            const value = parseInputEventToNumberString(v);
            setValue?.(`pool.${label}Value`, value);
            setValue?.(
              `pool.${label}ValueBN`,
              FixedPointMath.toBigNumber(
                value,
                label === 'quote' ? 8 : getValues('decimals')
              )
            );
          },
        })}
      />
    </Box>
  );
};

export default Input;
