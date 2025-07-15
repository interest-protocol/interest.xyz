import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { TimesSVG } from '@/components/svg';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

import {
  SearchTokenForm,
  SelectTokenModalProps,
  TokenOrigin,
} from './select-token-modal.types';
import SelectTokenModalBody from './select-token-modal-body';
import SelectTokenModalSearchInput from './select-token-modal-search-input';

const SelectTokenModal: FC<SelectTokenModalProps> = ({
  isOutput,
  onSelect,
  closeModal,
}) => {
  const form = useForm<SearchTokenForm>({
    defaultValues: {
      search: '',
      filter: TokenOrigin.Strict,
    },
  });

  const handleSelectToken = (metadata: AssetMetadata) => {
    onSelect(metadata);
    closeModal();
  };

  return (
    <Box
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="9999"
      position="fixed"
      display="flex"
      alignItems="center"
      onClick={closeModal}
      justifyContent="center"
      backdropFilter="blur(10px)"
    >
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <FormProvider {...form}>
          <Motion
            layout
            gap="1rem"
            bg="#121313"
            display="flex"
            maxHeight="34rem"
            height="34rem"
            overflow="hidden"
            borderRadius="s"
            color="onSurface"
            padding="1.25rem"
            flexDirection="column"
            width={['90vw', '32rem']}
            boxShadow="0 0 5px #3334"
            maxWidth={['25rem', 'unset']}
            transition={{ duration: 0.3 }}
            border="1px solid #FFFFFF1A"
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                size="large"
                variant="title"
                fontWeight="700"
                fontFamily="Inter"
                lineHeight="1.5rem"
                fontSize="1.125rem"
              >
                Select Token
              </Typography>
              <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
                <TimesSVG maxWidth="0.8rem" maxHeight="0.8rem" width="100%" />
              </Button>
            </Box>
            <SelectTokenModalSearchInput />
            <Box
              flex="1"
              bg="#121313"
              display="flex"
              overflowY="auto"
              flexDirection="column"
            >
              <SelectTokenModalBody
                isOutput={isOutput}
                control={form.control}
                handleSelectToken={handleSelectToken}
              />
            </Box>
          </Motion>
        </FormProvider>
      </Motion>
    </Box>
  );
};

export default SelectTokenModal;
