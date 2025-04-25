import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PoolFarmsOption } from '../../pool-details.types';
import FarmField from '../farm-field';
import { FarmFieldProps } from '../farm-field/farm-field.types';
import FarmRewards from '../farm-rewards';
import FarmFormManager from './farm-form-manager';
import FarmPreviewFormButton from './farm-preview-form-button';

const PoolFormFarms: FC<FarmFieldProps> = ({ farmMode }) => (
  <>
    <Box display="flex" flexDirection="column" gap="m">
      <FarmField farmMode={farmMode} />
      <FarmRewards />
    </Box>
    <FarmFormManager />
    <FarmPreviewFormButton state={farmMode as PoolFarmsOption} />
  </>
);

export default PoolFormFarms;
