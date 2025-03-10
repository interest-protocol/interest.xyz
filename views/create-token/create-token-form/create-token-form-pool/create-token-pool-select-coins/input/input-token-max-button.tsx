import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { LIST_BUTTON_PERCENTAGE } from '@/views/create-token/create-token.data';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const InputTokenMaxButton: FC = () => {
  const { control, setValue } = useFormContext<ICreateTokenForm>();

  const balance = useWatch({ control, name: `supply` });
  const decimals = useWatch({ control, name: `decimals` });

  const handleMax = (percentage: number) => {
    setValue(`pool.tokenValue`, String(balance * percentage));
    setValue(
      `pool.tokenValueBN`,
      FixedPointMath.toBigNumber(balance * percentage, decimals)
    );
  };

  return (
    <Box display="flex" gap="xs">
      {LIST_BUTTON_PERCENTAGE.map((item) => (
        <Button
          px="xs"
          py="2xs"
          key={v4()}
          fontSize="xs"
          variant="outline"
          color="onSurface"
          borderRadius="2xs"
          onClick={() => handleMax(item.percentage)}
        >
          {item.display}
        </Button>
      ))}
    </Box>
  );
};

export default InputTokenMaxButton;
