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
import CloseSearch from '@/components/svg/close-search';
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

  const searchValue = form.watch('search');

  return (
    <FormProvider {...form}>
      <Motion
        layout
        gap="1rem"
        bg="#121313"
        display="flex"
        maxHeight="33rem"
        overflow="hidden"
        color="onSurface"
        borderRadius="s"
        padding="1.25rem"
        flexDirection="column"
        width={['90vw', '32rem']}
        boxShadow="0 0 5px #3334"
        border="1px solid #FFFFFF1A"
        maxWidth={['25rem', 'unset']}
        transition={{ duration: 0.3 }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            size="large"
            fontSize="xl"
            variant="title"
            fontWeight="700"
            fontFamily="Inter"
          >
            Select Token
          </Typography>
          <Button variant="text" isIcon onClick={closeModal} mr="-0.5rem">
            <TimesSVG maxWidth="0.8rem" maxHeight="0.8rem" width="100%" />
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" gap="1rem">
          <Box>
            <TextField
              fontSize="medium"
              {...form.register('search')}
              placeholder="Search token"
              nPlaceholder={{ opacity: 0.7 }}
              fieldProps={{
                height: '2.75rem',
                borderRadius: 'xs',
                color: '#FFFFFF',
                backgroundColor: '#202123',
                border: searchValue?.trim() ? '1px solid #9CA3AF' : 'none',
              }}
              fontFamily="Inter"
              Prefix={
                <SearchSVG
                  width="100%"
                  color="#6B7280"
                  maxWidth="0.9375rem"
                  maxHeight="0.9375rem"
                />
              }
              Suffix={
                searchValue?.trim() ? (
                  <Box
                    cursor="pointer"
                    maxWidth="0.9375rem"
                    maxHeight="0.9375rem"
                    onClick={() => form.setValue('search', '')}
                  >
                    <CloseSearch
                      width="100%"
                      color="#6B7280"
                      maxWidth="0.9375rem"
                      maxHeight="0.9375rem"
                    />
                  </Box>
                ) : null
              }
            />
          </Box>
          {searchValue === '' && (
            <SelectTokenFilter
              control={form.control}
              setValue={form.setValue}
            />
          )}
        </Box>
        <Box
          flex="1"
          bg="#121313"
          display="flex"
          overflowY="auto"
          maxHeight="20rem"
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
