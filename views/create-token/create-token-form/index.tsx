import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CreateTokenFormStep, ICreateTokenForm } from '../create-token.types';
import CreateTokenFormDeployPool from './create-token-form-deploy-pool';
import CreateTokenFormPreset from './create-token-form-preset';
import ProgressBar from './progress-bar';

const CreateTokenForm: FC = () => {
  const { control } = useFormContext<ICreateTokenForm>();
  const step = useWatch({ control, name: 'step' });
  return (
    <Box
      width="100%"
      display="flex"
      bg="#9CA3AF1A"
      flexDirection="column"
      borderRadius="0.75rem"
    >
      <ProgressBar currentStep={2} totalSteps={2} />
      <Box p="1.5rem" display="flex" flexDirection="column">
        {step === CreateTokenFormStep.PresetInfo ? (
          <CreateTokenFormPreset />
        ) : (
          <CreateTokenFormDeployPool />
        )}
      </Box>
    </Box>
  );
};

export default CreateTokenForm;
