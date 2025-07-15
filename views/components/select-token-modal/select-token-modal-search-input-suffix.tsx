import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import CloseSearch from '@/components/svg/close-search';

import { SearchTokenForm } from './select-token-modal.types';

const SelectTokenModalSearchInputSuffix: FC = () => {
  const { setValue, control } = useFormContext<SearchTokenForm>();

  const searchValue = useWatch({ control, name: 'search' });

  return searchValue?.trim() ? (
    <Box
      color="#6B7280"
      cursor="pointer"
      maxWidth="1.25rem"
      maxHeight="1.25rem"
      onClick={() => setValue('search', '')}
    >
      <CloseSearch width="100%" maxWidth="1.25rem" maxHeight="1.25rem" />
    </Box>
  ) : null;
};

export default SelectTokenModalSearchInputSuffix;
