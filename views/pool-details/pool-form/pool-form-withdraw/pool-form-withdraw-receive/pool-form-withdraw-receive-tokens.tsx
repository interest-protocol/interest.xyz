import { Network } from '@interest-protocol/interest-aptos-v2';
import {
  Box,
  ProgressIndicator,
  RadioButton,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { SelectionFieldValues, TokenListProps } from '../../pool-form.types';

const PoolFormWithdrawReceiveTokens: FC<TokenListProps> = ({ type }) => {
  const { control, setValue, getValues } = useFormContext<IPoolForm>();

  const [tokenList, tokenSelected, loading] = useWatch({
    control,
    name: ['tokenList', 'tokenSelected', 'isFindingPool'],
  });

  const isOneCoin = type === SelectionFieldValues.OneCoin;

  return (
    <Box>
      {tokenList.map(({ type, symbol, value, projectUri }) => (
        <Box
          p="m"
          key={v4()}
          display="flex"
          cursor="pointer"
          alignItems="center"
          justifyContent="space-between"
          transition="all 350ms ease-in-out"
          nHover={isOneCoin && { bg: 'lowContainer' }}
          onClick={() => {
            if (isOneCoin) {
              setValue('tokenSelected', type);
              getValues('tokenList').forEach((_, index) => {
                setValue(`tokenList.${index}.value`, '0');
                setValue(`tokenList.${index}.valueBN`, ZERO_BIG_NUMBER);
              });
            }
          }}
        >
          <Box display="flex" gap="l" alignItems="center">
            {isOneCoin && <RadioButton defaultValue={tokenSelected === type} />}
            <TokenIcon
              withBg
              symbol={symbol}
              url={projectUri}
              network={Network.MovementMainnet}
            />
            <Typography variant="body" size="large">
              {symbol}
            </Typography>
          </Box>
          {loading ? (
            <ProgressIndicator size={16} variant="loading" />
          ) : (
            <Typography variant="body" ml="m" size="large">
              {value || 0}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default PoolFormWithdrawReceiveTokens;
