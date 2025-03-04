import {
  InputGenerateTransactionPayloadData,
  MoveValue,
} from '@aptos-labs/ts-sdk';
import { Network } from '@interest-protocol/aptos-sr-amm';
import { Button } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { Routes, RoutesEnum } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import { CreatePoolForm, Token } from '../pool-create.types';
import { logCreatePool } from '../pool-create.utils';

const PoolSummaryButton: FC = () => {
  const dex = useInterestDex();
  const { push } = useRouter();
  const network = Network.Porto;
  const client = useAptosClient();
  const { dialog, handleClose } = useDialog();
  const {
    account,
    name: wallet,
    signTransaction,
    signAndSubmitTransaction,
  } = useAptosWallet();
  const { setValue, getValues, resetField } = useFormContext<CreatePoolForm>();

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    resetField('explorerLink');
  };

  const onCreatePool = async () => {
    try {
      const { tokens } = getValues();
      setValue('error', '');

      invariant(account, 'You must be connected');

      const [coins, fas] = tokens.reduce(
        (acc, token) =>
          token.standard === TokenStandard.COIN
            ? [[...acc[0], token], acc[1]]
            : token.standard === TokenStandard.FA
              ? [acc[0], [...acc[1], token]]
              : acc,
        [[], []] as [ReadonlyArray<Token>, ReadonlyArray<Token>]
      );

      let txResult;
      let payload: InputGenerateTransactionPayloadData;
      let pool: {
        exists: MoveValue;
        poolAddress: MoveValue;
      };

      if (coins.length > 1) {
        pool = await dex.getPoolAddress({
          faA: coins[0].type.toString(),
          faB: coins[1].type.toString(),
        });

        payload = dex.addLiquidityCoins({
          coinA: coins[0].type,
          coinB: coins[1].type,
          recipient: account.address,
          amountA: BigInt(
            FixedPointMath.toBigNumber(coins[0].value, coins[0].decimals)
              .decimalPlaces(0, 1)
              .toString()
          ),
          amountB: BigInt(
            FixedPointMath.toBigNumber(coins[1].value, coins[1].decimals)
              .decimalPlaces(0, 1)
              .toString()
          ),
        });
      } else if (coins.length === 1) {
        pool = await dex.getPoolAddress({
          faA: coins[0].type.toString(),
          faB: fas[0].type,
        });

        payload = dex.addLiquidityOneCoin({
          coinA: coins[0].type,
          faB: fas[0].type,
          recipient: account.address,
          amountA: BigInt(
            FixedPointMath.toBigNumber(coins[0].value, coins[0].decimals)
              .decimalPlaces(0, 1)
              .toString()
          ),
          amountB: BigInt(
            FixedPointMath.toBigNumber(fas[0].value, fas[0].decimals)
              .decimalPlaces(0, 1)
              .toString()
          ),
        });
      } else {
        pool = await dex.getPoolAddress({
          faA: fas[0].type,
          faB: fas[1].type,
        });

        payload = dex.addLiquidity({
          faA: fas[0].type,
          faB: fas[1].type,
          recipient: account.address,
          amountA: BigInt(fas[0].valueBN.decimalPlaces(0, 1).toString()),
          amountB: BigInt(fas[1].valueBN.decimalPlaces(0, 1).toString()),
        });
      }

      if (wallet === 'Razor Wallet') {
        const tx = await signAndSubmitTransaction({ payload });

        invariant(tx.status === 'Approved', 'Rejected by User');

        txResult = tx.args;
      } else {
        const tx = await client.transaction.build.simple({
          data: payload,
          sender: account.address,
        });

        const signedTx = await signTransaction(tx);

        invariant(signedTx.status === 'Approved', 'Rejected by User');

        const senderAuthenticator = signedTx.args;

        txResult = await client.transaction.submit.simple({
          transaction: tx,
          senderAuthenticator,
        });
      }

      await client.waitForTransaction({
        transactionHash: txResult.hash,
        options: { checkSuccess: true },
      });

      await logCreatePool(
        account.address,
        tokens[0],
        tokens[1],
        Network.Porto,
        txResult.hash
      );

      fetch('https://pool-indexer-production.up.railway.app/api/pool/sr-amm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          network,
          poolId: pool.poolAddress?.toString(),
        }),
      });

      push(
        `${Routes[RoutesEnum.PoolDetails]}?address=${pool.poolAddress?.toString()}`
      );
    } catch (e) {
      console.warn({ e });

      if ((e as any)?.data?.error_code === 'mempool_is_full')
        throw new Error('The mempool is full, try again in a few seconds.');

      throw e;
    }
  };

  const createPool = () =>
    dialog.promise(onCreatePool(), {
      loading: () => ({
        title: 'Create the pool...',
        message: 'We are creating the pool, and you will know when it is done',
      }),
      success: () => ({
        title: 'Pool created successfully',
        message:
          'Your pool was create successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: () => {
            gotoExplorer();
            handleClose();
          },
        },
      }),
      error: (error) => ({
        title: 'Pool creation failed',
        message:
          (error as Error).message ||
          'Your pool was not created, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
    });

  return (
    <Button variant="filled" onClick={createPool}>
      Create Pool
    </Button>
  );
};

export default PoolSummaryButton;
