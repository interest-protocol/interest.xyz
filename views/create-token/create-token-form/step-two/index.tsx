import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import CreateTokenFormButton from '../create-token-form-button';
import { StepTwoProps } from './step-two.types';

const StepTwo: FC<StepTwoProps> = ({ onBack }) => {
  const { control } = useForm<ICreateTokenForm>();

  const handleBack = () => {
    onBack();
  };

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

      <Box
        gap="l"
        p="0.75rem"
        width="100%"
        bg="#9CA3AF1A"
        display="flex"
        height="5.75rem"
        alignItems="center"
        borderRadius="0.75rem"
        border="1px solid #F3F4F61A"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column">
          <Typography
            size="medium"
            mb="0.5rem"
            variant="label"
            color="#FFFFFF"
            fontWeight="400"
            fontFamily="Inter"
            fontSize="1.125rem"
          >
            Deploy Pool Instantly
          </Typography>
          <Typography
            size="medium"
            variant="label"
            color="#9CA3AF"
            fontSize="1rem"
            fontWeight="400"
            fontFamily="Inter"
          >
            This feature will deploy the pool automatically
          </Typography>
        </Box>

        <Controller
          name="deploy_pool_instantly"
          control={control}
          render={({ field }) => (
            <Box
              width="2.75rem"
              height="1.5rem"
              cursor="pointer"
              position="relative"
              borderRadius="0.75rem"
              transition="all 0.3s ease"
              bg={field.value ? '#8BA5FF' : '#374151'}
              onClick={() => field.onChange(!field.value)}
            >
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                style={{ display: 'none' }}
              />
              <Box
                bg="#FFFFFF"
                top="0.14rem"
                width="1.25rem"
                height="1.25rem"
                borderRadius="50%"
                position="absolute"
                transition="all 0.3s ease"
                left={field.value ? '1.4rem' : '0.125rem'}
              />
            </Box>
          )}
        />
      </Box>

      <CreateTokenFormButton step={2} onBackClick={handleBack} />
    </>
  );
};

export default StepTwo;
