import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SearchSVG, TimesSVG } from '@/components/svg';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

import {
  SearchTokenForm,
  SelectTokenModalProps,
  TokenOrigin,
} from './select-token-modal.types';
import SelectTokenModalBody from './select-token-modal-body';
import SelectTokenFilter from './select-token-modal-filter';

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
    <FormProvider {...form}>
      <Motion
        layout
        display="flex"
        bg="container"
        height="41rem"
        maxHeight="90vh"
        overflow="hidden"
        color="onSurface"
        borderRadius="xs"
        flexDirection="column"
        width={['90vw', '25rem']}
        boxShadow="0 0 5px #3334"
        maxWidth={['25rem', 'unset']}
        transition={{ duration: 0.3 }}
      >
        <Box
          py="s"
          px="l"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="title" size="large" fontSize="xl">
            Select Token
          </Typography>
          <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
            <TimesSVG maxWidth="0.8rem" maxHeight="0.8rem" width="100%" />
          </Button>
        </Box>
        <Box mx="xl" display="flex" gap="3xs" flexDirection="column">
          <Box>
            <TextField
              fontSize="medium"
              {...form.register('search')}
              placeholder="Search token"
              nPlaceholder={{ opacity: 0.7 }}
              fieldProps={{ height: '3.5rem', mb: 'm', borderRadius: 'xs' }}
              Prefix={
                <SearchSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
              }
            />
          </Box>
          <SelectTokenFilter control={form.control} setValue={form.setValue} />
        </Box>
        <Box
          flex="1"
          display="flex"
          overflowY="auto"
          bg="lowContainer"
          flexDirection="column"
        >
          <SelectTokenModalBody
            control={form.control}
            isOutput={isOutput}
            handleSelectToken={handleSelectToken}
          />
        </Box>
      </Motion>
    </FormProvider>
  );
};

export default SelectTokenModal;
