import {
  Box,
  BoxElementProps,
  Button,
  TextFieldElementProps,
  Typography,
} from '@interest-protocol/ui-kit';
import stylin from '@stylin.js/react';
import {
  ChangeEvent,
  FC,
  forwardRef,
  PropsWithRef,
  RefAttributes,
  useId,
  useState,
} from 'react';

import InfoSVG from '@/components/svg/info';

import {
  FormFieldBoxProps,
  TextAreaElementProps,
} from './form-field-box.types';

const TextFieldElement = stylin<TextFieldElementProps & RefAttributes<unknown>>(
  'input'
)({
  '&::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
  },
  '&::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
  },
});

const TextAreaElement = stylin<TextAreaElementProps & RefAttributes<unknown>>(
  'textarea'
)({});

const FieldContainer = stylin<BoxElementProps & RefAttributes<unknown>>('div')({
  '&:has(input:focus), &:has(textarea:focus)': {
    borderColor: '#B4C5FF',
  },

  '&:has(input:not(:placeholder-shown):not(:focus)), &:has(textarea:not(:placeholder-shown):not(:focus))':
    {
      borderColor: '#9CA3AF',
    },
});

export const FormFieldBox: FC<
  PropsWithRef<Omit<FormFieldBoxProps, 'Prefix' | 'onFocus' | 'onBlur'>>
> = forwardRef(
  (
    {
      label,
      Suffix,
      status,
      disabled,
      fieldProps,
      isTextArea,
      supportingText,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState<string>();
    const id = useId();

    const statusColor = !status ? ' #fff' : status == 'none' ? '#fff' : status;

    const handleBorderStatus = () => {
      const isError = status === 'error';
      const isSuccess = status === 'success';
      const hasStatus = isError || isSuccess;
      if (disabled) return '1px solid red';
      if (hasStatus)
        return `1px solid ${isError ? '#FED7D7' : '#BAF6CF'} !important`;
    };

    const changeValue = (input: string) => setValue(input);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
      changeValue(e.target.value);

    return (
      <Box>
        <FieldContainer
          p="0.75rem"
          pb={isTextArea ? '0.75rem' : '1rem'}
          display="flex"
          gap="0.25rem"
          bg="#9CA3AF1A"
          borderRadius="0.75rem"
          border={handleBorderStatus() || '1px solid #F3F4F61A'}
          {...fieldProps}
        >
          <Box width="100%">
            <Box display="flex">
              <Typography
                size="small"
                display="flex"
                variant="body"
                color="#9CA3AF"
                fontWeight="400"
                fontFamily="Inter"
                fontSize="0.875rem"
                lineHeight="1.25rem"
                alignItems="center"
              >
                {label}
              </Typography>
              <Button
                isIcon
                p="unset"
                ml="0.25rem"
                variant="text"
                width="1.25rem"
                color="#6B7280"
                height="1.25rem"
                nHover={{
                  bg: 'unset',
                  color: 'primary',
                }}
              >
                <InfoSVG maxWidth="100%" maxHeight="100%" width="100%" />
              </Button>
            </Box>
            <Box>
              {isTextArea ? (
                <TextAreaElement
                  id={id}
                  rows={2}
                  ref={ref}
                  all="unset"
                  width="100%"
                  disabled={disabled}
                  color={
                    statusColor == 'success'
                      ? '#fff'
                      : statusColor == 'error'
                        ? '#FED7D7'
                        : statusColor
                  }
                  placeholder="Enter pool description here..."
                  nPlaceholder={{
                    color: '#6B7280',
                  }}
                />
              ) : (
                <TextFieldElement
                  id={id}
                  ref={ref}
                  all="unset"
                  width="100%"
                  fontSize="1rem"
                  bg="transparent"
                  height="1.25rem"
                  fontWeight="400"
                  fontFamily="Inter"
                  disabled={disabled}
                  color={
                    statusColor == 'success'
                      ? '#fff'
                      : statusColor == 'error'
                        ? '#FED7D7'
                        : statusColor
                  }
                  lineHeight="1.25rem"
                  onChange={handleChange}
                  defaultValue={value || props.defaultValue}
                  nPlaceholder={{
                    color: '#6B7280',
                  }}
                  placeholder="Name"
                  {...props}
                />
              )}
            </Box>
          </Box>
          {Suffix}
        </FieldContainer>
        {supportingText && (
          <Typography
            size="small"
            px="0.75rem"
            pt="0.25rem"
            hyphens="auto"
            variant="body"
            wordWrap="break-word"
            overflowWrap="break-word"
            color={disabled ? '#6B7280' : statusColor}
          >
            {supportingText}
          </Typography>
        )}
      </Box>
    );
  }
);

FormFieldBox.displayName = 'FormFieldBox';
export * from './form-field-box.types';
