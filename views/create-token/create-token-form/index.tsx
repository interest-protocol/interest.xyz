import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import ProgressBar from './progress-bar';
import StepOne from './step-one';
import StepTwo from './step-two';

const CreateTokenForm: FC = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

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
        {step === 1 ? (
          <StepOne onNext={handleNext} />
        ) : (
          <StepTwo onBack={handleBack} />
        )}
      </Box>
    </Box>
  );
};

export default CreateTokenForm;
