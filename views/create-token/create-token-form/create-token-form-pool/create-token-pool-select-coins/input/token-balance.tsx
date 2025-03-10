import { Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const TokenBalance: FC = () => {
  const { control, setValue } = useFormContext<ICreateTokenForm>();

  const supply = useWatch({ control, name: `supply` });

  const handleMax = () => setValue(`pool.tokenValue`, String(supply));

  return (
    <Button
      p="2xs"
      gap="0.5rem"
      display="flex"
      color="onSurface"
      variant="outline"
      alignItems="center"
      onClick={handleMax}
      borderColor="transparent"
      nHover={{ bg: 'unset', borderColor: 'primary' }}
      className="loading-balance"
    >
      <Typography size="small" variant="body" fontSize="xs">
        Balance: {supply}
      </Typography>
    </Button>
  );
};

export default TokenBalance;
