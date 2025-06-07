import { InterestDex } from '@interest-protocol/aptos-move-dex';
import {
  Network,
  normalizeSuiAddress,
} from '@interest-protocol/interest-aptos-v2';
import {
  Box,
  Button,
  TooltipWrapper,
  Typography,
} from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import toast from 'react-hot-toast';
import invariant from 'tiny-invariant';

import { RateDownSVG, RateUpSVG, WrapSVG } from '@/components/svg';
import TokenIcon from '@/components/token-icon';
import { COIN_TYPE_TO_FA } from '@/constants/coins';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { formatDollars, formatMoney, ZERO_BIG_NUMBER } from '@/utils';

import { CoinCardProps } from '../../../user-info.types';
import CardWrapper from './card-wrapper';
import { logWrapCoin } from './coin-card.utils';

type CoinType = keyof typeof COIN_TYPE_TO_FA;

const CoinCard: FC<CoinCardProps> = ({ token }) => {
  const network = useNetwork<Network>();
  const { coinsMap, mutate } = useCoins();
  const { account, signAndSubmitTransaction } = useAptosWallet();

  const symbol = token.symbol;
  const decimals = token.decimals;

  const { data: price } = useCoinsPrice(token.type);

  const coin = coinsMap[normalizeSuiAddress(token.type)];

  const balance = FixedPointMath.toNumber(
    coin?.balance ?? ZERO_BIG_NUMBER,
    coin?.decimals ?? decimals
  );

  const dexV2 = new InterestDex();

  const handleWrapCoin = async () => {
    const id = toast.loading(`Wrapping ${symbol}...`);
    try {
      invariant(account, 'You should have this coin in your wallet');
      invariant(coin, 'You should have this coin in your wallet');

      const payload = dexV2.wrapCoin({
        coinType: token.type,
        amount: BigInt(coin.balance.toString()),
        recipient: account.address,
      });

      const tx = await signAndSubmitTransaction({ payload });

      invariant(tx.status === 'Approved', 'Rejected by User');

      const txResult = tx.args;

      logWrapCoin(account.address, symbol, network, txResult.hash);

      toast.success(`${symbol} wrapped successfully!`);
    } catch (e) {
      if ((e as any).data.error_code === 'mempool_is_full')
        toast.error('The mempool is full, try again in a few seconds.');
      else toast.error((e as Error).message);
    } finally {
      mutate();
      toast.dismiss(id);
    }
  };

  const isConvertible = (token.type as CoinType) in COIN_TYPE_TO_FA;

  if ((!coin || coin.balance.isZero()) && isConvertible) return;

  return (
    <CardWrapper
      TokenIcon={
        <TokenIcon
          withBg
          size="1.5rem"
          symbol={symbol}
          network={network}
          url={token.iconUri}
          rounded={token.standard === TokenStandard.COIN}
        />
      }
      symbol={symbol}
      supportingText={
        price?.length && price[0].price
          ? formatDollars(
              +BigNumber(balance)
                .times(BigNumber(price[0].price))
                .toNumber()
                .toFixed(3)
            )
          : '--'
      }
    >
      <Box display="flex" gap="s" alignItems="center">
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-start"
        >
          <Typography size="large" variant="label" lineHeight="1.5rem">
            {formatMoney(balance)}
            <Box fontSize="Satoshi" as="span" ml="2xs">
              {symbol}
            </Box>
          </Typography>
          {!!price?.length && price[0]?.priceChange24HoursPercentage && (
            <Box
              gap="xs"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {price?.[0]?.priceChange24HoursPercentage < 1 ? (
                <RateDownSVG
                  width="1rem"
                  height="1rem"
                  maxHeight="100%"
                  maxWidth="100%"
                />
              ) : (
                <RateUpSVG
                  width="1rem"
                  height="1rem"
                  maxHeight="100%"
                  maxWidth="100%"
                />
              )}
              <Typography
                size="large"
                opacity={0.7}
                variant="label"
                color="onSurface"
                fontSize="0.625rem"
                lineHeight="1rem"
              >
                {(price?.length && price[0]?.priceChange24HoursPercentage) ?? 0}
              </Typography>
            </Box>
          )}
        </Box>
        {isConvertible && (
          <TooltipWrapper
            bg="lowContainer"
            tooltipPosition="top"
            tooltipContent={
              <Typography variant="body" size="small" whiteSpace="nowrap">
                Convert to FA
              </Typography>
            }
          >
            <Button
              isIcon
              variant="text"
              color="primary"
              onClick={handleWrapCoin}
              disabled={!coin || coin.balance.isZero()}
            >
              <WrapSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
            </Button>
          </TooltipWrapper>
        )}
      </Box>
    </CardWrapper>
  );
};

export default CoinCard;
