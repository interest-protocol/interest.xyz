import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { PlusSVG } from '@/components/svg';

import { CreatePoolForm, Token } from '../pool-create.types';
import PoolCreateButton from '../pool-next-button';
import Input from './input';
import SelectCoinsError from './select-coins-error';
import SelectCoinsErrorManager from './select-coins-error-manager';

const SelectCoins: FC = () => {
  const { control } = useFormContext<CreatePoolForm>();
  const algorithm = useWatch({ control, name: 'algorithm' });
  const { fields, append, remove } = useFieldArray({ control, name: 'tokens' });

  return (
    <>
      <Box my="xl">
        <Box
          p="2xl"
          mx="auto"
          gap="2rem"
          bg="container"
          maxWidth="33rem"
          borderRadius="xs"
        >
          <Typography variant="body" size="small" color="onSurface">
            Select Token & Deposit
          </Typography>
          <Box display="flex" flexDirection="column" gap="2xs" my="l">
            {fields.map((_, index) => (
              <Input
                index={index}
                key={v4()}
                {...(fields.length > 2 && { onRemove: () => remove(index) })}
              />
            ))}
            {algorithm === 'clamm' && (
              <Box display="flex" justifyContent="center">
                <Button
                  color="onSurface"
                  variant="outline"
                  borderColor="outline"
                  onClick={() =>
                    append({
                      name: '',
                      value: '',
                      symbol: '',
                      decimals: 0,
                      type: '' as `0x${string}`,
                    } as Token)
                  }
                  PrefixIcon={
                    <PlusSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
                  }
                >
                  Add Coin
                </Button>
              </Box>
            )}
          </Box>
          <SelectCoinsErrorManager />
          <SelectCoinsError />
        </Box>
      </Box>
      <PoolCreateButton />
    </>
  );
};

export default SelectCoins;
