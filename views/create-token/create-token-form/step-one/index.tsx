import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import FormFieldBox from '@/components/layout/form-field-box';
import InfoSVG from '@/components/svg/info';

import { ICreateTokenForm } from '../../create-token.types';
import CreateTokenFormButton from '../create-token-form-button';
import CreateTokenFormImage from '../create-token-form-upload-image';
import { StepOneProps } from './step-one.types';

const StepOne: FC<StepOneProps> = ({ onNext }) => {
  const { register } = useFormContext<ICreateTokenForm>();

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
          register={register('name')}
          width={['100%', '20.4rem']}
          error={errors.name?.message}
          icon={<InfoSVG maxWidth="1.25rem" maxHeight="1.25rem" />}
        />

        <FormFieldBox
          label="Coin symbol"
          placeholder="Symbol"
          width={['100%', '20.4rem']}
          register={register('symbol')}
          error={errors.symbol?.message}
          icon={<InfoSVG maxWidth="1.25rem" maxHeight="1.25rem" />}
        />
      </Box>

      <Box mb={errors.projectUrl ? '2xl' : 0}>
        <FormFieldBox
          label="Project URL"
          register={register('projectUrl')}
          placeholder="Eg. www.project.com"
          error={errors.projectUrl?.message}
          icon={<InfoSVG maxWidth="1.25rem" maxHeight="1.25rem" />}
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
          width={['100%', '19.5rem']}
          placeholder="www.project.com"
          register={register('imageUrl')}
          error={errors.imageUrl?.message}
          supportingText="We recommend to upload an image with 250x250 pixels."
          icon={<InfoSVG maxWidth="1.25rem" maxHeight="1.25rem" />}
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
        register={register('description')}
        label="Pool Description (optional)"
        error={errors.description?.message}
        placeholder="Enter pool description here..."
        icon={<InfoSVG maxWidth="1.25rem" maxHeight="1.25rem" />}
      />

      <CreateTokenFormButton step={1} onClick={handleNext} />
    </>
  );
};

export default StepOne;
