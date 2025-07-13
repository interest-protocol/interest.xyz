import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { ICreateTokenForm } from '../../create-token.types';
import CreateTokenFormButton from '../create-token-form-button';
import CreateTokenFormImage from '../create-token-form-upload-image';
import FormFieldBox from '../form-field-box';
import { StepOneProps } from './step-one.types';

const StepOne: FC<StepOneProps> = ({ onNext }) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<ICreateTokenForm>();

  const handleNext = () => {
    const values = getValues();
    const hasAllRequiredFields =
      values.name && values.symbol && values.projectUrl && values.imageUrl;

    if (hasAllRequiredFields) onNext();
    else {
      setValue('error', 'Fill all required fields first');
    }
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
        Choose a preset
      </Typography>

      <Box
        gap="l"
        display="flex"
        justifyContent="space-between"
        flexDirection={['column', 'row']}
        mb={errors.name || errors.symbol ? '2xl' : 0}
      >
        <FormFieldBox
          label="Coin name"
          placeholder="Name"
          registerName="name"
          width={['100%', '20.4rem']}
          error={errors.name?.message}
        />

        <FormFieldBox
          label="Coin symbol"
          placeholder="Symbol"
          registerName="symbol"
          width={['100%', '20.4rem']}
          error={errors.symbol?.message}
        />
      </Box>

      <Box mb={errors.projectUrl ? '2xl' : 0}>
        <FormFieldBox
          label="Project URL"
          registerName="projectUrl"
          placeholder="Eg. www.project.com"
          error={errors.projectUrl?.message}
        />
      </Box>

      <Box
        gap="l"
        mb="2xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={['column', 'row']}
      >
        <FormFieldBox
          label="Image URL"
          registerName="imageUrl"
          width={['100%', '19.5rem']}
          placeholder="www.project.com"
          error={errors.imageUrl?.message}
          supportingText="We recommend to upload an image with 250x250 pixels."
        />

        <Typography
          size="small"
          variant="body"
          color="#ACB5BB"
          textAlign="center"
        >
          OR
        </Typography>

        <CreateTokenFormImage setValue={setValue} />
      </Box>

      <FormFieldBox
        height="5.625rem"
        registerName="description"
        label="Pool Description (optional)"
        error={errors.description?.message}
        placeholder="Enter pool description here..."
      />

      <CreateTokenFormButton step={1} onClick={handleNext} />
    </>
  );
};

export default StepOne;
