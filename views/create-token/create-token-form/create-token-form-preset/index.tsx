import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormFieldBox } from '@/components/layout/form-field-box';

import { ICreateTokenForm } from '../../create-token.types';
import CreateTokenFormButton from '../create-token-form-button';
import CreateTokenFormImage from '../create-token-form-upload-image';

const CreateTokenFormPreset: FC = () => {
  const {
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useFormContext<ICreateTokenForm>();

  return (
    <>
      <Typography
        mb="1rem"
        size="small"
        variant="body"
        color="#E5E7EB"
        fontSize="1rem"
        fontWeight="600"
        fontFamily="Inter"
        lineHeight="1.75rem"
      >
        Choose a preset
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <Box
          gap="1.5rem"
          display="grid"
          gridTemplateColumns={['1fr', '1fr', '1fr 1fr']}
        >
          <FormFieldBox
            label="Coin name"
            placeholder="Name"
            {...register('name')}
            supportingText={errors.name?.message}
            status={errors.name?.message ? 'error' : 'none'}
          />
          <FormFieldBox
            label="Coin symbol"
            placeholder="symbol"
            {...register('symbol')}
            supportingText={errors.symbol?.message}
            status={errors.symbol?.message ? 'error' : 'none'}
          />
        </Box>

        <Box gap="1.5rem" display="grid" gridTemplateColumns="1fr">
          <FormFieldBox
            label="Project URL"
            {...register('projectUrl')}
            placeholder="Eg. www.project.com"
            supportingText={errors.projectUrl?.message}
            status={errors.projectUrl?.message ? 'error' : 'none'}
          />
        </Box>

        <Box
          gap="1.5rem"
          display="grid"
          gridTemplateColumns={['1fr', '1fr', '1fr 1rem 1fr']}
        >
          <FormFieldBox
            label="Image URL"
            placeholder="www.project.com"
            {...register('imageUrl')}
            supportingText={errors.imageUrl?.message}
            Suffix={
              <Box
                width="2.75rem"
                height="2.75rem"
                mixBlendMode="screen"
                backgroundSize="contain"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundImage={`url(${getValues('imageUrl')})`}
              />
            }
          />
          <Typography
            my="auto"
            size="small"
            variant="body"
            color="#ACB5BB"
            textAlign="center"
            pb={errors.imageUrl?.message ? '20px' : 'unset'}
          >
            OR
          </Typography>

          <CreateTokenFormImage setValue={setValue} />
        </Box>

        <Box gap="1.5rem" display="grid" gridTemplateColumns="1fr">
          <FormFieldBox
            label="Pool Description (optional)"
            {...register('description')}
            placeholder="Enter pool description here..."
            supportingText={errors.description?.message}
            status={errors.description?.message ? 'error' : 'none'}
            isTextArea
          />
        </Box>
        <CreateTokenFormButton />
      </Box>
    </>
  );
};

export default CreateTokenFormPreset;
