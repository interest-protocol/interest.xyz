import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import { CogsSVG } from '@/components/svg';
import Tabs from '@/components/tabs';
import { useModal } from '@/hooks/use-modal';
import { useTabState } from '@/hooks/use-tab-manager';

const DCATabs: FC = () => {
  const { tab, setTab } = useTabState();
  const tabs = ['Trade', 'Orders'];

  const { setModal, handleClose } = useModal();
  const form = useFormContext();

  const handleOpenSettings = () =>
    setModal(
      <FormProvider {...form}>
        <Box
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          display="flex"
          position="fixed"
          zIndex={2}
          alignItems="center"
          justifyContent="center"
          backdropFilter="blur(10px)"
          onClick={() => handleClose()}
        >
          <Motion
            animate={{ scale: 1 }}
            initial={{ scale: 0.85 }}
            transition={{ duration: 0.3 }}
          ></Motion>
        </Box>
      </FormProvider>,
      { isOpen: true, custom: true, onClose: handleClose }
    );

  return (
    <Box
      display="flex"
      mb="0.75rem"
      alignItems="center"
      justifyContent="space-between"
    >
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

export default DCATabs;
