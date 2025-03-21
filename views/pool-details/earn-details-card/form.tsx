import { Network } from '@interest-protocol/interest-aptos-v2';
import {
  Box,
  Theme,
  TokenFieldElementProps,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import stylin from '@stylin.js/react';
import dynamic from 'next/dynamic';
import { FC, RefAttributes } from 'react';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { noop } from '@/utils';

import { EarnCardFormProps } from './earn-details-card.types';

const Slider = dynamic(
  import('@interest-protocol/ui-kit').then(({ Slider }) => Slider),
  { ssr: false }
);

const TokenFieldElement = stylin<
  TokenFieldElementProps & RefAttributes<unknown>
>('input')();

const EarnCardForm: FC<EarnCardFormProps> = ({ token, isRewards }) => {
  const network = useNetwork<Network>();
  const { colors } = useTheme() as Theme;

  return (
    <>
      <Box
        mb="m"
        mt="1rem"
        gap="l"
        width="100%"
        display="flex"
        height="2.5rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          py="m"
          gap="s"
          width="100%"
          display="flex"
          overflowWrap="anywhere"
          justifyContent="space-between"
          flexDirection={['column', 'row']}
        >
          <Box
            gap="s"
            display="flex"
            alignItems="center"
            width={['100%', '50%']}
          >
            <TokenIcon
              withBg
              size="1.5rem"
              network={network}
              url={token?.iconUri ?? ''}
              symbol={token?.symbol ?? ''}
              rounded={token?.standard === TokenStandard.COIN}
            />
            <Typography
              size="large"
              variant="label"
              color="onSurface"
              whiteSpace="nowrap"
              fontFamily="Satoshi"
            >
              {token?.symbol}
            </Typography>
          </Box>
          <Box
            px="s"
            border={'1px solid ' + colors.outlineVariant}
            borderRadius="xs"
            bg={isRewards ? 'lowContainer' : 'lowestContainer'}
            pb={!isRewards ? '0.6rem' : '2xs'}
            pt={!isRewards ? '0.6rem' : '2xs'}
          >
            <TokenFieldElement
              all="unset"
              fontFamily="Proto"
              placeholder="--"
              textAlign="right"
              width="100%"
              fontSize="1rem"
              color={colors.onSurface}
            />
            {isRewards && (
              <Typography
                size="small"
                variant="label"
                textAlign="right"
                color="onSurface"
                fontSize="0.6rem"
              >
                -- USD
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      {!isRewards && (
        <Box mb="2rem" mt="-1rem" width="100%">
          <Slider initial={0} max={100} onChange={noop} />
        </Box>
      )}
    </>
  );
};

export default EarnCardForm;
