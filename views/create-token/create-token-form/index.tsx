import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import StepOne from './create-token-form-pool/step-one';
import StepTwo from './create-token-form-pool/step-two';
import ProgressBar from './progress-bar';

const CreateTokenForm: FC = () => {
  const [step] = useState(2);

  const steps = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      default:
        return null;
    }
  };

  return (
    <Box
      p="0"
      gap="1rem"
      width="100%"
      bg="#9CA3AF1A"
      display="flex"
      borderRadius="0.75rem"
      flexDirection="column"
    >
      <ProgressBar currentStep={step} totalSteps={2} />
      <Box p="1.5rem" gap="1rem" display="flex" flexDirection="column">
        {steps()}
      </Box>
    </Box>
  );
};

export default CreateTokenForm;
