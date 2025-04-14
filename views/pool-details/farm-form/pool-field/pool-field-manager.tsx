import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useInterestCurveDex } from '@/hooks/use-interest-dex-curve';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { NameProps } from './pool-field.types';

const PoolFieldManager: FC<NameProps> = ({ name }) => {
  const { pool } = usePoolDetails();
  const curveDex = useInterestCurveDex();
  const { control, setValue, getValues } = useFormContext<IPoolForm>();

  const amount = useWatch({ control, name: `${name}.value` });
  const lpCoinDecimals = useWatch({ control, name: `lpCoin.decimals` });
  const token0Decimals = useWatch({ control, name: `tokenList.0.decimals` });
  const token1Decimals = useWatch({ control, name: `tokenList.1.decimals` });

  useEffect(() => {
    if (!pool) return;

    if (pool.algorithm === 'curve') {
      if (name !== 'lpCoin') {
        if (!getValues('tokenList').some(({ value }) => Number(value))) {
          setValue('lpCoin.value', '0');
          setValue('lpCoin.valueBN', ZERO_BIG_NUMBER);
        } else
          curveDex
            .quoteAddLiquidity({
              pool: pool.poolAddress,
              amountsIn: getValues('tokenList').map((token) =>
                BigInt(token.valueBN?.isZero() ? 0 : token.valueBN.toFixed(0))
              ),
            })
            .then(({ amountOut }) => {
              setValue(
                'lpCoin.value',
                String(
                  FixedPointMath.toNumber(
                    BigNumber(String(amountOut)),
                    getValues('lpCoin.decimals')
                  )
                )
              );
              setValue('lpCoin.valueBN', BigNumber(String(amountOut)));
            });
      } else {
        if (!Number(getValues('lpCoin.value'))) {
          getValues('tokenList').forEach((_, index) => {
            setValue(`tokenList.${index}.value`, '0');
            setValue(`tokenList.${index}.valueBN`, ZERO_BIG_NUMBER);
          });
        } else
          curveDex
            .quoteRemoveLiquidity({
              pool: pool.poolAddress,
              amountIn: BigInt(getValues('lpCoin.valueBN').toFixed(0)),
            })
            .then(({ amountsOut }) => {
              (amountsOut as Array<string>).forEach((amountOut, index) => {
                setValue(
                  `tokenList.${index}.value`,
                  String(
                    FixedPointMath.toNumber(
                      BigNumber(amountOut),
                      getValues('lpCoin.decimals')
                    )
                  )
                );
                setValue(
                  `tokenList.${index}.valueBN`,
                  BigNumber(String(amountOut))
                );
              });
            });
      }

      return;
    }

    if (pool.algorithm === 'v2') {
      const [reserve0, reserve1] = pool.balances!.map((balance, index) =>
        FixedPointMath.toNumber(
          BigNumber(String(balance)),
          getValues(`tokenList.${index}.decimals`)
        )
      );

      const supply = FixedPointMath.toNumber(
        BigNumber(String(pool.poolExtraData?.supply)),
        getValues('lpCoin.decimals')
      );

      if (!getValues(`${name}.locked`)) return;

      if (name !== 'lpCoin') {
        const isFirst = 'tokenList.0' === name;
        const decimals = isFirst ? token1Decimals : token0Decimals;

        const reserveX = isFirst ? reserve0 : reserve1;
        const reserveY = isFirst ? reserve1 : reserve0;

        const amountX = Number(amount);
        const amountY = (amountX * reserveY) / reserveX;

        const liquidityX = (amountX * supply) / reserveX;
        const liquidityY = (amountY * supply) / reserveY;

        const liquidity = liquidityX > liquidityY ? liquidityY : liquidityX;

        setValue(
          `tokenList.${!isFirst ? '0' : '1'}.value`,
          String(amountY.toFixed(6))
        );
        setValue(
          `tokenList.${!isFirst ? '0' : '1'}.valueBN`,
          FixedPointMath.toBigNumber(String(amountY), decimals)
        );

        setValue('lpCoin.value', String(liquidity.toFixed(6)));
        setValue(
          'lpCoin.valueBN',
          FixedPointMath.toBigNumber(String(liquidity), lpCoinDecimals)
        );
      } else {
        const lpAmount = Number(amount);

        const amount0 = (lpAmount * reserve0) / supply;
        const amount1 = (lpAmount * reserve1) / supply;

        setValue(`tokenList.0.value`, String(amount0));
        setValue(`tokenList.1.value`, String(amount1));
        setValue(
          `tokenList.0.valueBN`,
          FixedPointMath.toBigNumber(String(amount0), token0Decimals)
        );
        setValue(
          `tokenList.1.valueBN`,
          FixedPointMath.toBigNumber(String(amount1), token1Decimals)
        );
      }
    }
  }, [amount]);

  return null;
};

export default PoolFieldManager;
