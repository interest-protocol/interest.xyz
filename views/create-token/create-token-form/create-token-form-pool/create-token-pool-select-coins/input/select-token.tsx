import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label, isMobile }) => {
  const network = useNetwork<Network>();
  const { control } = useFormContext<ICreateTokenForm>();

  const tokenSymbol = useWatch({ control, name: `symbol` });
  const tokenImageUrl = useWatch({ control, name: `imageUrl` });

  if (label === 'token')
    return (
      <Box p="xs" position="relative">
        <Button
          p="2xs"
          fontSize="s"
          width="100%"
          variant="tonal"
          color="onSurface"
          borderRadius="xs"
          disabled={true}
          nDisabled={{ bg: 'transparent' }}
          PrefixIcon={
            <TokenIcon
              withBg
              network={network}
              url={tokenImageUrl}
              symbol={tokenSymbol}
            />
          }
        >
          <Typography
            p="xs"
            variant="label"
            whiteSpace="nowrap"
            width="100%"
            size={isMobile ? 'large' : 'small'}
          >
            {tokenSymbol}
          </Typography>
        </Button>
      </Box>
    );

  return (
    <Box p="xs" position="relative">
      <Button
        p="2xs"
        fontSize="s"
        width="100%"
        variant="tonal"
        disabled={true}
        color="onSurface"
        borderRadius="xs"
        nDisabled={{ bg: 'transparent' }}
        PrefixIcon={<TokenIcon withBg symbol="faMOVE" network={network} />}
      >
        <Typography
          p="xs"
          width="100%"
          variant="label"
          whiteSpace="nowrap"
          size={isMobile ? 'large' : 'small'}
        >
          faMOVE
        </Typography>
      </Button>
    </Box>
  );
};

export default SelectToken;
