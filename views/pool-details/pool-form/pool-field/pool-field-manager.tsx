import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';

import { useInterestCurveDex } from '@/hooks/use-interest-dex-curve';
import { FixedPointMath } from '@/lib';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { MaxButtonProps as NameProps } from './pool-field.types';

const PoolFieldManager: FC<Omit<NameProps, 'index'>> = ({ name }) => {
  const { pool } = usePoolDetails();
  const curveDex = useInterestCurveDex();
  const { control, setValue, getValues } = useFormContext<IPoolForm>();

  const amount = useWatch({ control, name: `${name}.value` });
  const selectedCoinIndex = useWatch({ control, name: 'selectedCoinIndex' });
  const lpCoinDecimals = useWatch({ control, name: `lpCoin.decimals` });
  const tokenList = useWatch({ control, name: `tokenList` });
  const token0Decimals = useWatch({ control, name: `tokenList.0.decimals` });
  const token1Decimals = useWatch({ control, name: `tokenList.0.decimals` });

  useSWR([amount, selectedCoinIndex], () => {
    if (!pool) return;

    if (pool.algorithm === 'curve') {
      if (name !== 'lpCoin') {
        if (!tokenList.some(({ value }) => Number(value))) {
          setValue('lpCoin.value', '0');
          setValue('lpCoin.valueBN', ZERO_BIG_NUMBER);
        } else
          curveDex
            .quoteAddLiquidity({
              pool: pool.poolAddress,
              amountsIn: tokenList.map((token) =>
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
        } else {
          if (selectedCoinIndex[0] && selectedCoinIndex[1])
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
                        getValues(`tokenList.${index}.decimals`)
                      )
                    )
                  );
                  setValue(
                    `tokenList.${index}.valueBN`,
                    BigNumber(String(amountOut))
                  );
                });
              })
              .catch();
          else {
            const tmpIndex = selectedCoinIndex[0] ? 0 : 1;
            (tokenList[tmpIndex].standard === TokenStandard.COIN
              ? curveDex.quoteRemoveLiquidityOneCoin({
                  pool: pool.poolAddress,
                  coinOut: tokenList[tmpIndex].type,
                  amountIn: BigInt(getValues('lpCoin.valueBN').toFixed(0)),
                })
              : curveDex.quoteRemoveLiquidityOneFa({
                  pool: pool.poolAddress,
                  faOut: tokenList[tmpIndex].type,
                  amountIn: BigInt(getValues('lpCoin.valueBN').toFixed(0)),
                })
            )
              .then(({ amountOut }) => {
                setValue(
                  `tokenList.${tmpIndex}.valueBN`,
                  BigNumber(String(amountOut))
                );
                setValue(
                  `tokenList.${tmpIndex}.value`,
                  String(
                    FixedPointMath.toNumber(
                      BigNumber(String(amountOut)),
                      getValues(`tokenList.${tmpIndex}.decimals`)
                    )
                  )
                );
              })
              .catch();
          }
        }
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
  });

  return null;
};

export default PoolFieldManager;
