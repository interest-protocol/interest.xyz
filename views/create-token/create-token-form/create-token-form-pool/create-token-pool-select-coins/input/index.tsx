import { FA_ADDRESSES, Network } from '@interest-protocol/interest-aptos-v2';
import { Box } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useEventListener from '@/hooks/use-event-listener';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';
import { TokenField } from '@/views/pool-create/select-coins/input/token-field';

import { InputProps } from './input.types';
import InputQuoteMaxButton from './input-quote-max-button';
import InputTokenMaxButton from './input-token-max-button';
import QuoteBalance from './quote-balance';
import QuoteInputDollar from './quote-input-dollar';
import SelectToken from './select-token';
import TokenBalance from './token-balance';
import TokenInputDollar from './token-input-dollar';

const Input: FC<InputProps> = ({ label }) => {
  const { coinsMap } = useCoins();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<ICreateTokenForm>();

  const type = FA_ADDRESSES[Network.MovementMainnet].MOVE.toString();
  const balance =
    label == 'quote'
      ? FixedPointMath.toNumber(coinsMap[type]?.balance ?? ZERO_BIG_NUMBER)
      : getValues('supply');

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
        Bottom={label === 'token' ? <TokenInputDollar /> : <QuoteInputDollar />}
        TokenIcon={<SelectToken label={label} isMobile={isMobile} />}
        Balance={label === 'token' ? <TokenBalance /> : <QuoteBalance />}
        ButtonMax={
          label === 'token' ? <InputTokenMaxButton /> : <InputQuoteMaxButton />
        }
        {...register(`pool.${label}Value`, {
          onChange: (v: ChangeEvent<HTMLInputElement>) => {
            const value = parseInputEventToNumberString(v);
            const amount = +value > balance ? balance : value;
            setValue?.(`pool.${label}Value`, String(amount));
            setValue?.(
              `pool.${label}ValueBN`,
              FixedPointMath.toBigNumber(
                amount,
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
