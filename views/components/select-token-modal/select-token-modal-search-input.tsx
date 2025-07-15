import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { SearchSVG } from '@/components/svg';
import { TextField } from '@/components/text-field';

import { SearchTokenForm } from './select-token-modal.types';
import SelectTokenFilter from './select-token-modal-filter';
import SelectTokenModalSearchInputSuffix from './select-token-modal-search-input-suffix';

const SelectTokenModalSearchInput: FC = () => {
  const { register } = useFormContext<SearchTokenForm>();

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Box>
        <TextField
          {...register('search')}
          placeholder="Search token"
          fieldProps={{
            borderRadius: '0.75rem',
          }}
          fontFamily="Inter"
          Prefix={
            <Box mr="0.5rem" display="flex" color="#6B7280" alignItems="center">
              <SearchSVG width="100%" maxWidth="1.25rem" maxHeight="1.25rem" />
            </Box>
          }
          Suffix={<SelectTokenModalSearchInputSuffix />}
        />
      </Box>
      <SelectTokenFilter />
    </Box>
  );
};

export default SelectTokenModalSearchInput;
