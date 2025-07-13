import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import CreateTokenFormButton from '../../create-token-form-button';

const StepTwo: FC = () => {
  const { register } = useFormContext<ICreateTokenForm>();

  return (
    <>
      <Typography
        size="small"
        variant="label"
        color="#E5E7EB"
        fontSize="1rem"
        fontWeight="600"
        fontFamily="Inter"
      >
        Features
      </Typography>

      <Box gap="l" display="flex" justifyContent="space-between">
        <Box
          p="0.75rem"
          bg="#9CA3AF1A"
          width="20.4rem"
          height="4.59375rem"
          borderRadius="0.75rem"
          border="1px solid #F3F4F61A"
        >
          <Typography
            size="small"
            mb="0.25rem"
            variant="label"
            color="#9CA3AF"
            fontWeight="400"
            fontFamily="Inter"
            fontSize="0.875rem"
          >
            Coin name
          </Typography>
          <Box>
            <TextField
              ml="-1rem"
              {...register('name')}
              placeholder="Name"
              nPlaceholder={{ opacity: 0.7 }}
              width="100%"
              lineHeight="l"
              color="onSurface"
              fontFamily="Inter"
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
      </Box>
      <CreateTokenFormButton />
    </>
  );
};

export default StepTwo;
