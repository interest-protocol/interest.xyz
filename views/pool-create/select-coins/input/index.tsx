import { Button, Motion } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { TimesSVG } from '@/components/svg';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';
import { TokenField } from '@/views/pool-create/select-coins/input/token-field';

import useEventListener from '../../../../hooks/use-event-listener';
import { CreatePoolForm } from '../../pool-create.types';
import Balance from './balance';
import FormInputDollar from './form-input-dollar';
import { InputProps } from './input.types';
import InputMaxButton from './input-max-button';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ index, onRemove }) => {
  const { register, getValues, setValue } = useFormContext<CreatePoolForm>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleSetMobile = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(max-width: 26.875rem)').matches;
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetMobile, true);

  return (
    <Motion
      width="100%"
      display="flex"
      position="relative"
      alignContent="center"
      flexDirection="column"
      justifyContent="center"
    >
      <TokenField
        active
        opacity="0.7"
        placeholder="--"
        variant="outline"
        textAlign="right"
        status="none"
        Bottom={<FormInputDollar index={index} />}
        {...register(`tokens.${index}.value`, {
          onChange: (v: ChangeEvent<HTMLInputElement>) => {
            const value = parseInputEventToNumberString(v);
            setValue?.(`tokens.${index}.value`, value);
            setValue?.(
              `tokens.${index}.valueBN`,
              FixedPointMath.toBigNumber(
                value,
                getValues(`tokens.${index}.decimals`)
              )
            );
          },
        })}
        Balance={<Balance index={index} />}
        ButtonMax={<InputMaxButton index={index} />}
        TokenIcon={<SelectToken index={index} isMobile={isMobile} />}
      />
      {onRemove && (
        <Button
          isIcon
          p="3xs"
          top="-0.5rem"
          right="-0.25rem"
          variant="filled"
          onClick={onRemove}
          bg="errorContainer"
          borderRadius="full"
          position="absolute"
          color="onErrorContainer"
        >
          <TimesSVG width="100%" maxWidth="0.5rem" maxHeight="0.5rem" />
        </Button>
      )}
    </Motion>
  );
};

export default Input;
