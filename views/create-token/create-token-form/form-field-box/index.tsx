'use client';

import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import InfoSVG from '@/components/svg/info';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import { FormFieldBoxProps } from './form-field-box.types';

const FormFieldBox: FC<FormFieldBoxProps> = ({
  label,
  placeholder,
  registerName,
  type = 'text',
  width = '100%',
  height = '4.59375rem',
  error,
  supportingText,
}) => {
  const { register } = useFormContext<ICreateTokenForm>();

  return (
    <Box
      p="0.75rem"
      bg="#9CA3AF1A"
      borderRadius="0.75rem"
      border="1px solid #F3F4F61A"
      width={width}
      height={height}
    >
      <Typography
        size="small"
        mb="0.25rem"
        variant="label"
        color="#9CA3AF"
        fontWeight="400"
        fontFamily="Inter"
        fontSize="0.875rem"
        display="flex"
        alignItems="center"
        gap="0.25rem"
      >
        {label}
        <InfoSVG maxWidth="1.25rem" maxHeight="1.25rem" />
      </Typography>

      <Box>
        <TextField
          ml="-1rem"
          {...register(registerName)}
          type={type}
          placeholder={placeholder}
          nPlaceholder={{ opacity: 0.7 }}
          status={error ? 'error' : undefined}
          supportingText={error || supportingText}
          fontSize="1rem"
          fieldProps={{
            width: '100%',
            border: 'none',
            nHover: { border: 'none' },
            fontWeight: 400,
            color: '#FFFFFF',
          }}
        />
      </Box>
    </Box>
  );
};

export default FormFieldBox;
