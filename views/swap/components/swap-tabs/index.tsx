import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import { CogsSVG } from '@/components/svg';
import Tabs from '@/components/tabs';
import { useModal } from '@/hooks/use-modal';
import { useTabState } from '@/hooks/use-tab-manager';

import SwapSettingsForm from '../swap-settings-form';

const SwapTabs: FC = () => {
  const { tab, setTab } = useTabState();
  const tabs = ['Swap', 'Bridge'];

  const { setModal, handleClose } = useModal();
  const form = useFormContext();

  const handleOpenSettings = () =>
    setModal(
      <FormProvider {...form}>
        <SwapSettingsForm />
      </FormProvider>,
      { isOpen: true, custom: true, onClose: handleClose }
    );

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Tabs tabs={tabs} setTab={setTab} tab={tab} />
      <Box
        role="button"
        lineHeight="0"
        display="flex"
        cursor="pointer"
        color="onSurface"
        alignItems="center"
        aria-label="Settings"
        onClick={handleOpenSettings}
        transition="transform 500ms ease-in-out"
        nHover={{ transform: 'rotate(180deg)' }}
      >
        <CogsSVG maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
      </Box>
    </Box>
  );
};

export default SwapTabs;
