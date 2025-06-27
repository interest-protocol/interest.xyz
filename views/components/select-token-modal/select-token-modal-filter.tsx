import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  SelectTokenFilterProps,
  TokenOrigin,
} from './select-token-modal.types';

const ORIGIN_TITLE = {
  [TokenOrigin.Strict]: 'Strict',
  [TokenOrigin.Wallet]: 'Wallet',
};

const SelectTokenFilter: FC<SelectTokenFilterProps> = ({
  control,
  setValue,
}) => {
  const filterSelected = useWatch({ control, name: 'filter' });

  return (
    <Box gap="s" display="grid" flexWrap="wrap" gridTemplateColumns="1fr 1fr">
      {[TokenOrigin.Strict, TokenOrigin.Wallet].map((item) => (
        <Box
          key={v4()}
          cursor="pointer"
          onClick={() => setValue('filter', item)}
        >
          <Typography
            py="m"
            size="medium"
            variant="body"
            fontWeight="400"
            textAlign="center"
            fontFamily="Inter"
            color={filterSelected === item ? '#FFFFFF' : '#9CA3AF'}
          >
            {ORIGIN_TITLE[item]}
          </Typography>
          {filterSelected === item && (
            <Motion
              layout
              py="8px"
              px="95px"
              mt={'-21%'}
              bg="#B4C5FF33"
              color="#FFFFFF"
              height="2.75rem"
              fontWeight="500"
              maxWidth="232px"
              fontFamily="Inter"
              borderRadius="9999px"
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SelectTokenFilter;
