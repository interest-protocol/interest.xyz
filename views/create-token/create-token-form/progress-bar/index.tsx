import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ProgressBarProps } from './progress-bar.types';

const ProgressBar: FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Box width="100%" bg="#9CA3AF1A" height="0.375rem" borderRadius="9999px">
      <Box
        height="100%"
        bg="primary"
        borderRadius="9999px"
        width={`${progress}%`}
        transition="width 0.3s ease"
        style={{
          background: 'linear-gradient(90deg, #8BA5FF 0%, #6366F1 100%)',
        }}
      />
    </Box>
  );
};

export default ProgressBar;
