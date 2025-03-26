import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { usePoolDetails } from '@/views/pool-details/pool-details.context';

import { SelectionFieldValues } from '../../pool-form.types';
import PoolFormWithdrawReceiveTokens from './pool-form-withdraw-receive-tokens';
import PoolFormWithdrawReceiveType from './pool-form-withdraw-receive-type';

const PoolFormWithdrawReceive: FC = () => {
  const { pool } = usePoolDetails();
  const [currentSelected, setCurrentSelected] = useState<SelectionFieldValues>(
    SelectionFieldValues.Balance
  );

  return (
    <Box display="flex" flexDirection="column" gap="m">
      <Typography variant="body" size="large">
        2. Choose type
      </Typography>
      <Box
        display="flex"
        overflow="hidden"
        borderRadius="xs"
        border="1px solid"
        bg="lowestContainer"
        borderColor="outline"
        flexDirection="column"
      >
        {pool?.algorithm === 'curve' && (
          <Box
            p="l"
            gap="xl"
            display="flex"
            color="outline"
            borderBottom="1px solid"
          >
            <PoolFormWithdrawReceiveType
              label="One Coin"
              currentValue={currentSelected}
              handleSelect={setCurrentSelected}
              type={SelectionFieldValues.OneCoin}
            />
            <PoolFormWithdrawReceiveType
              label="Balanced"
              currentValue={currentSelected}
              handleSelect={setCurrentSelected}
              type={SelectionFieldValues.Balance}
            />
          </Box>
        )}
        {pool?.algorithm !== 'curve' ? (
          <PoolFormWithdrawReceiveTokens type={SelectionFieldValues.Balance} />
        ) : currentSelected ? (
          <PoolFormWithdrawReceiveTokens type={currentSelected} />
        ) : null}
      </Box>
    </Box>
  );
};

export default PoolFormWithdrawReceive;
