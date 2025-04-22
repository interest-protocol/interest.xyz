import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { isNil } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { CheckboxSVG } from '@/components/svg';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';
import { usePoolDetails } from '@/views/pool-details/pool-details.context';
import { IPoolForm } from '@/views/pools/pools.types';

const PoolFormWithdrawReceiveTokens: FC = () => {
  const { pool } = usePoolDetails();
  const network = useNetwork<Network>();

  const { control, setValue } = useFormContext<IPoolForm>();

  const [tokenList, selectedCoinIndex] = useWatch({
    control,
    name: ['tokenList', 'selectedCoinIndex'],
  });

  return (
    <Box>
      {tokenList && tokenList[0]?.symbol
        ? tokenList.map((token, index) => (
            <Box
              py="m"
              px="xs"
              key={v4()}
              display="flex"
              cursor="pointer"
              alignItems="center"
              justifyContent="space-between"
              transition="all 350ms ease-in-out"
              nHover={{ bg: 'lowContainer' }}
            >
              <Box display="flex" alignItems="center" gap="xs">
                {pool?.algorithm === 'curve' && (
                  <Typography
                    as="span"
                    size="large"
                    variant="label"
                    cursor="pointer"
                    onClick={() => {
                      setValue(
                        'selectedCoinIndex',
                        selectedCoinIndex === index ? undefined : index
                      );
                      tokenList.forEach((_, internalIndex) => {
                        setValue(`tokenList.${internalIndex}.value`, '0');
                        setValue(
                          `tokenList.${internalIndex}.valueBN`,
                          ZERO_BIG_NUMBER
                        );
                      });
                    }}
                  >
                    <CheckboxSVG
                      width="100%"
                      maxWidth="1.2rem"
                      maxHeight="1.2rem"
                      status={
                        isNil(selectedCoinIndex)
                          ? 'active'
                          : selectedCoinIndex === index
                            ? 'checked'
                            : 'unchecked'
                      }
                    />
                  </Typography>
                )}
                <Box display="flex" gap="xs" alignItems="center">
                  <TokenIcon withBg network={network} symbol={token.symbol} />
                  <Typography variant="body" size="large">
                    {token.symbol}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body" ml="m" mr="m" size="large">
                {token.value || 0}
              </Typography>
            </Box>
          ))
        : [1, 2].map(() => (
            <Box
              py="m"
              px="xs"
              key={v4()}
              display="flex"
              cursor="pointer"
              alignItems="center"
              justifyContent="space-between"
              transition="all 350ms ease-in-out"
              nHover={{ bg: 'lowContainer' }}
            >
              <Box display="flex" gap="xs" alignItems="center">
                <Box display="flex" alignItems="center" gap="s">
                  <Box gap="s" display="flex" alignItems="center">
                    <Skeleton
                      width="calc(1.5rem * 1.66)"
                      height="calc(1.5rem * 1.66)"
                    />
                    <Skeleton width="4.5rem" height="1.7rem" />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
    </Box>
  );
};

export default PoolFormWithdrawReceiveTokens;
