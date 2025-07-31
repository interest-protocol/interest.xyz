import {
  FA_ADDRESSES,
  Network,
  normalizeSuiAddress,
} from '@interest-protocol/interest-aptos-v2';
import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import SubtractBox from '@/components/svg/subtract-box';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import { MaxBadge } from './max-budget';

const QuoteBalance: FC = () => {
  const { coinsMap, loading } = useCoins();
  const { setValue } = useFormContext<ICreateTokenForm>();

  const type = FA_ADDRESSES[Network.MovementMainnet].MOVE.toString();
  const balance =
    coinsMap[normalizeSuiAddress(type)]?.balance ?? ZERO_BIG_NUMBER;

  const handleMax = () => {
    const value = balance.minus(FixedPointMath.toBigNumber(1));

    if (!value.isPositive()) {
      setValue(`pool.quoteValue`, '0');
      setValue(`pool.quoteValueBN`, ZERO_BIG_NUMBER);
      return;
    }

    setValue(`pool.quoteValue`, String(FixedPointMath.toNumber(value)));
    setValue(`pool.quoteValueBN`, value);
  };

  return (
    <Box display="flex" gap="xs" alignItems="center">
      <Box display={['none', 'block']} width="1.38875rem" height="1.25rem">
        <SubtractBox
          maxHeight="100%"
          maxWidth="100%"
          width="100%"
          height="100%"
        />
      </Box>
      <Typography
        size="small"
        variant="body"
        color="#D1D5DB"
        fontWeight="400"
        fontSize="0.75rem"
        fontFamily="Inter"
        whiteSpace="nowrap"
      >
        {FixedPointMath.toNumber(balance) ?? '--'}
      </Typography>
      <MaxBadge handleMax={handleMax} />
      {loading && (
        <Box
          mx="xs"
          mt="-1.7rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box position="absolute" justifySelf="flex-end">
            <ProgressIndicator variant="loading" size={12} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuoteBalance;
