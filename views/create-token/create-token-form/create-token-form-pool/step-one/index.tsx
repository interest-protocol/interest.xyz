import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import InfoSVG from '@/components/svg/info';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import CreateTokenFormButton from '../../create-token-form-button';
import CreateTokenFormImage from '../../create-token-form-upload-image';

const StepOne: FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ICreateTokenForm>();

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
        Choose a preset
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
            display="flex"
            alignItems="center"
            gap="0.25rem"
          >
            Coin name
            <InfoSVG width="100%" maxWidth="1.25rem" maxHeight="1.25rem" />
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
        <Box
          p="0.75rem"
          width="20.4rem"
          bg="#9CA3AF1A"
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
            display="flex"
            alignItems="center"
            gap="0.25rem"
          >
            Coin symbol
            <InfoSVG width="100%" maxWidth="1.25rem" maxHeight="1.25rem" />
          </Typography>
          <Box>
            <TextField
              ml="-1rem"
              placeholder="Symbol"
              {...register('symbol')}
              nPlaceholder={{ opacity: 0.7 }}
              status={errors.symbol && 'error'}
              supportingText={errors.symbol?.message}
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

      <Box
        p="0.75rem"
        width="100%"
        bg="#9CA3AF1A"
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
          display="flex"
          alignItems="center"
          gap="0.25rem"
        >
          Project URL
          <InfoSVG maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
        </Typography>
        <Box>
          <TextField
            ml="-1rem"
            {...register('projectUrl')}
            nPlaceholder={{ opacity: 0.7 }}
            status={errors.projectUrl && 'error'}
            placeholder="Eg. www.project.com"
            supportingText={errors.projectUrl?.message}
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

      <Box
        gap="l"
        mb="2xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          p="0.75rem"
          bg="#9CA3AF1A"
          width="19.5rem"
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
            display="flex"
            alignItems="center"
            gap="0.25rem"
          >
            Image URL
            <InfoSVG width="100%" maxWidth="1.25rem" maxHeight="1.25rem" />
          </Typography>

          <Box>
            <TextField
              ml="-1rem"
              type="link"
              {...register('imageUrl')}
              nPlaceholder={{ opacity: 0.7 }}
              status={errors.imageUrl && 'error'}
              placeholder="www.project.com"
              fieldProps={{
                width: '100%',
                border: 'none',
                nHover: { border: 'none' },
                fontWeight: 400,
                color: '#FFFFFF',
              }}
              supportingText={
                errors.imageUrl?.message ??
                'We recommend to upload an image with 250x250 pixels.'
              }
            />
          </Box>
        </Box>

        <Typography
          size="small"
          variant="body"
          color="#ACB5BB"
          textAlign="center"
        >
          OR
        </Typography>

        <Box display="flex" flexDirection="column" gap="xs">
          <CreateTokenFormImage setValue={setValue} />
        </Box>
      </Box>
      <Box
        p="0.75rem"
        width="100%"
        bg="#9CA3AF1A"
        height="5.625rem"
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
          display="flex"
          alignItems="center"
          gap="0.25rem"
        >
          Pool Description (optional)
          <InfoSVG width="100%" maxWidth="1.25rem" maxHeight="1.25rem" />
        </Typography>
        <Box>
          <TextField
            ml="-1rem"
            {...register('description')}
            nPlaceholder={{ opacity: 0.7 }}
            status={errors.description && 'error'}
            placeholder="Enter pool description here..."
            supportingText={errors.description?.message}
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
      <Box width="100%">
        <CreateTokenFormButton />
      </Box>
    </>
  );
};

export default StepOne;
