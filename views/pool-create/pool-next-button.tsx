import { MoveValue } from '@aptos-labs/ts-sdk';
import { Button, ProgressIndicator } from '@interest-protocol/ui-kit';
import { type FC, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useInterestDex } from '@/hooks/use-interest-dex';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import { CreatePoolForm, CreatePoolStep } from './pool-create.types';

const PoolNextButton: FC = () => {
  const dex = useInterestDex();
  const [loading, setLoading] = useState<boolean>(false);
  const { control, setValue, getValues } = useFormContext<CreatePoolForm>();

  const { step, tokens } = useWatch({ control });

  const error = getValues('error');

  const checkIfPoolExists = async () => {
    const internTokens = getValues('tokens');

    if (!internTokens || internTokens.length) return false;

    let pool: {
      exists: MoveValue;
      poolAddress: MoveValue;
    };

    const [coins, fas] = [
      internTokens.filter(({ standard }) => standard === TokenStandard.COIN),
      internTokens.filter(({ standard }) => standard === TokenStandard.FA),
    ];

    if (coins.length > 1) {
      pool = await dex.getPoolAddress({
        faA: coins[0].type.toString(),
        faB: coins[1].type.toString(),
      });
    } else if (coins.length === 1) {
      pool = await dex.getPoolAddress({
        faA: coins[0].type.toString(),
        faB: fas[0].type,
      });
    } else {
      pool = await dex.getPoolAddress({
        faA: fas[0].type,
        faB: fas[1].type,
      });
    }

    setLoading(false);

    return pool.exists as boolean;
  };

  const isDisabled = useMemo(() => {
    if (error || loading) return true;
    if (step === CreatePoolStep.PoolCoins)
      return !tokens?.every(
        ({ value, symbol, decimals }) =>
          symbol && Number(value) && String(decimals)
      );

    const internTokens = getValues('tokens');

    const [coinA, coinB] = internTokens;

    if (!coinA.type || !coinB.type) return true;

    if (!coinA.value || !coinB.value) return true;
  }, [step, tokens, loading]);

  return (
    <>
      <Button
        mx="auto"
        variant="filled"
        disabled={isDisabled || !!error}
        PrefixIcon={
          loading ? <ProgressIndicator variant="loading" size={16} /> : null
        }
        onClick={async () => {
          if (step === CreatePoolStep.PoolCoins) {
            const exists = await checkIfPoolExists();

            if (exists) {
              setValue('error', 'This pool already exists');
              return;
            }
          }

          setValue('step', step! + 1);
        }}
      >
        Next
      </Button>
    </>
  );
};

export default PoolNextButton;
