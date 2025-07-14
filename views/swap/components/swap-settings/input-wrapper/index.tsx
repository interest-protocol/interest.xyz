import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TextField } from '@/components/text-field';

import { InputWrapperProps } from './input-wrapper.types';

const InputWrapper: FC<InputWrapperProps> = ({
  title,
  register,
  name,
  Input,
  altInfo,
}) => {
  return (
    <>
      <Typography
        size="large"
        variant="body"
        color="#9CA3AF"
        fontSize="1rem"
        fontWeight="400"
        fontFamily="Inter"
        lineHeight="1.5rem"
      >
        {title}
      </Typography>
      {Input || (
        <TextField
          Suffix={altInfo}
          type="text"
          placeholder="0.5"
          textAlign="right"
          nPlaceholder={{ opacity: 0.7 }}
          {...register(name)}
          fieldProps={{
            width: '6rem',
          }}
        />
      )}
    </>
  );
};

export default InputWrapper;
