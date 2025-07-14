/* eslint-disable jsx-a11y/no-autofocus */
import { Box, BoxElementProps } from '@interest-protocol/ui-kit';
import stylin from '@stylin.js/react';
import {
  ChangeEvent,
  FC,
  FocusEvent,
  forwardRef,
  PropsWithRef,
  RefAttributes,
  startTransition,
  useId,
  useState,
} from 'react';

import { TextFieldElementProps, TextFieldProps } from './text-field.types';

const TextFieldElement = stylin<TextFieldElementProps & RefAttributes<unknown>>(
  'input'
)({
  '&[type="number"]': {
    '-moz-appearance': 'auto',

    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'auto',
      opacity: 1,
      display: 'none',
    },
  },
});

const FieldContainer = stylin<BoxElementProps & RefAttributes<unknown>>('div')({
  '&:has(input:focus)': {
    borderColor: '#B4C5FF',
    backgroundColor: '#2B2B2D',
  },

  '&:has(input:not(:placeholder-shown):not(:focus))': {
    borderColor: '#9CA3AF',
    backgroundColor: '#202123',
  },
});

export const TextField: FC<PropsWithRef<TextFieldProps>> = forwardRef(
  (
    {
      Suffix,
      Prefix,
      onBlur,
      status,
      onFocus,
      disabled,
      fieldProps,
      supportingText,
      ...props
    },
    ref
  ) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState<string>();
    const id = useId();

    const statusColor = focus || status === 'none' ? 'onSurface' : status;

    const handleBorderStatus = () => {
      const isFocused = focus && !disabled;
      const isError = status === 'error';
      const isSuccess = status === 'success';
      const hasStatus = isError || isSuccess;
      if (disabled) return '1px solid #46464A';
      if (isFocused) return '1px solid #B4C5FF';
      if (hasStatus)
        return '1px solid ' + status == 'error' ? '#FED7D7' : '#BAF6CF';
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
      if (!focus) startTransition(() => setFocus(true));

      onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
      if (focus) startTransition(() => setFocus(false));

      onBlur?.(e);
    };

    const changeValue = (input: string) => setValue(input);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      changeValue(e.target.value);

    return (
      <Box
        all="inherit"
        opacity={disabled ? 0.32 : 1}
        cursor={disabled ? 'not-allowed' : 'text'}
        aria-label="textfieldHolder"
      >
        <FieldContainer
          p="0.75rem"
          bg="#202123"
          display="flex"
          height="2.75rem"
          gap={Suffix || Prefix ? '0.15rem' : 'unset'}
          alignItems="center"
          borderRadius="0.75rem"
          border={handleBorderStatus() || '1px solid'}
          borderColor={handleBorderStatus() || '#9CA3AF1F'}
          nHover={{
            borderStyle: 'solid',
            borderWidth: focus ? '1px' : disabled ? '1px' : '1px',
            borderColor: !disabled ? '#44464A' : 'outlineVariant',
            backgroundColor: !focus ? '#44464A' : '#2B2B2D',
          }}
          nActive={{
            borderColor: '#B4C5FF ',
          }}
          transition="all 300ms ease-in-out"
          color="#6B7280"
          {...fieldProps}
        >
          {Prefix}
          <Box
            flex="1"
            width="100%"
            height="100%"
            display="flex"
            alignItems="stretch"
            flexDirection="column"
            justifyContent="center"
            mr={status ? '0.5rem' : 'unset'}
            aria-label="inputHolder"
          >
            <TextFieldElement
              ref={ref}
              id={id}
              all="unset"
              type="text"
              width="100%"
              fontSize="1rem"
              fontWeight="400"
              fontFamily="Inter"
              autoFocus={focus}
              disabled={disabled}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleChange}
              color="#FFFFFF"
              defaultValue={value || props.defaultValue}
              nPlaceholder={{
                color: '#6B7280',
              }}
              {...props}
            />
          </Box>
          {Suffix}
        </FieldContainer>
        {supportingText && (
          <Box
            pt="2xs"
            fontSize="0.75rem"
            color={disabled ? 'onSurface' : statusColor}
          >
            {supportingText}
          </Box>
        )}
      </Box>
    );
  }
);

TextField.displayName = 'TextField';
export * from './text-field.types';
