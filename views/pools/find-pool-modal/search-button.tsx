import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { IPoolForm, PoolToken } from '../pools.types';
import { FindPoolModalProps } from './find-pool-modal.types';

const SearchButton: FC<FindPoolModalProps> = ({ closeModal }) => {
  const { setValue, getValues } = useFormContext<IPoolForm>();
  const [isError, setError] = useState(false);

  const tokenListData = getValues('tokenList');

  const hasEmptyKeys = (token: ReadonlyArray<PoolToken>) =>
    token.some((obj) => !obj.symbol);

  const handleFindPool = () => {
    if (hasEmptyKeys(tokenListData)) return setError(true);
    setValue('filterList', []);
    setValue('isFindingPool', true);
    closeModal();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {isError && (
        <Typography
          p="2xs"
          color="error"
          size="medium"
          variant="body"
          textAlign="center"
        >
          Token cannot be empty, please select a token
        </Typography>
      )}
      <Button
        display="flex"
        variant="filled"
        minWidth="17rem"
        borderRadius="xs"
        justifyContent="center"
        onClick={handleFindPool}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchButton;
