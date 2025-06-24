import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useModal } from '@/hooks/use-modal';

import SwapSettingsForm from '../swap-settings-form';
import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const { setModal, handleClose } = useModal();
  const form = useFormContext();

  const symbol = useWatch({ control: form.control, name: `${label}.symbol` });

  setModal(
    <FormProvider {...form}>
      <SwapSettingsForm />
    </FormProvider>,
    { isOpen: true, custom: true, onClose: handleClose }
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      color="onSurface"
      alignItems="flex-end"
    >
      <Typography variant="label" size="large" fontSize="s" fontFamily="Inter">
        {label == 'from' ? 'Sell' : 'BUY'}
        <Typography
          as="span"
          size="small"
          fontSize="s"
          variant="body"
          display={['inline-block', 'none']}
        >
          : {symbol}
        </Typography>
      </Typography>
    </Box>
  );
};

export default HeaderInfo;
