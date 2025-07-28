import { normalizeSuiAddress } from '@interest-protocol/interest-aptos-v2';
import { Box, TextField } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { MOVE } from '@/constants/coins';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import AmountInDollar from './dollar-value';
import { InputProps } from './input.types';
import QuoteBalance from './quote-balance';
import SelectToken from './select-token';
import TokenBalance from './token-balance';

const Input: FC<InputProps> = ({ label }) => {
  const { coinsMap } = useCoins();
  const { account } = useAptosWallet();
  const { register, setValue, getValues } = useFormContext<ICreateTokenForm>();

  const type = MOVE.address.toString();
  const balance =
    label == 'quote'
      ? FixedPointMath.toNumber(
          coinsMap[normalizeSuiAddress(type)]?.balance ?? ZERO_BIG_NUMBER
        )
      : getValues('supply');

  const rawValue = getValues(`pool.${label}Value`);
  const isEmpty = !rawValue || isNaN(+rawValue) || +rawValue <= 0;

  return (
    <Box
      gap="l"
      px="1rem"
      py="1.5rem"
      width="100%"
      bg="#9CA3AF1A"
      display="flex"
      height="5.75rem"
      alignItems="center"
      borderRadius="0.75rem"
      border="1px solid #F3F4F61A"
      justifyContent="space-between"
    >
      <Box
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
      >
        <Box
          gap="xs"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <TextField
              ml="-1rem"
              width="100%"
              lineHeight="l"
              placeholder="0"
              fontFamily="Inter"
              fontWeight="400"
              fontSize={['2xl', '2.25rem']}
              opacity={isEmpty ? 0.4 : undefined}
              fieldProps={{
                width: '100%',
                border: 'none',
                nHover: {
                  border: 'none',
                },
                color: isEmpty ? '#6B7280' : '#FFFFFF',
              }}
              {...register(`pool.${label}Value`, {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  const value = parseInputEventToNumberString(v);
                  const amount = +value > balance ? balance : value;
                  setValue?.(`pool.${label}Value`, String(amount));
                  setValue?.(
                    `pool.${label}ValueBN`,
                    FixedPointMath.toBigNumber(
                      amount,
                      label === 'quote' ? 8 : getValues('decimals')
                    )
                  );
                },
              })}
            />
          </Box>
          <SelectToken label={label} />
        </Box>
        {account?.address && (
          <Box display="flex" justifyContent="space-between" color="outline">
            <AmountInDollar label={label} />
            {label == 'token' ? <TokenBalance /> : <QuoteBalance />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Input;
