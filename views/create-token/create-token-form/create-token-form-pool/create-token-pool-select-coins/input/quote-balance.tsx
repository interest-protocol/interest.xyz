import { FA_ADDRESSES, Network } from '@interest-protocol/aptos-sr-amm';
import {
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const QuoteBalance: FC = () => {
  const { coinsMap, loading } = useCoins();
  const { setValue } = useFormContext<ICreateTokenForm>();

  const type = FA_ADDRESSES[Network.MovementMainnet].APT.toString();
  const balance = coinsMap[type]?.balance ?? ZERO_BIG_NUMBER;

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
        Balance: {FixedPointMath.toNumber(balance) ?? '--'}
      </Typography>
      {loading && <ProgressIndicator variant="loading" size={12} />}
    </Button>
  );
};

export default QuoteBalance;
