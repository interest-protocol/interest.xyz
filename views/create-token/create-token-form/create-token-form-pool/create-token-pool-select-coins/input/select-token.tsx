import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import TokenIcon from '@/components/token-icon';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label }) => {
  const network = useNetwork<Network>();
  const { control } = useFormContext<ICreateTokenForm>();

  const tokenSymbol = useWatch({ control, name: `symbol` });
  const tokenImageUrl = useWatch({ control, name: `imageUrl` });

  return (
    <Button
      height="0.5rem"
      fontSize="s"
      variant="tonal"
      color="onSurface"
      borderRadius="l"
      bg={'#030712'}
      pl={'0'}
      pr={'0.75rem'}
      PrefixIcon={
        <Box>
          {label === 'token' ? (
            <TokenIcon
              withBg
              size="1.25rem"
              network={network}
              url={tokenImageUrl}
              symbol={tokenSymbol}
            />
          ) : (
            <TokenIcon withBg symbol="MOVE" network={network} />
          )}
        </Box>
      }
    >
      <Typography
        size="large"
        maxWidth="12ch"
        color="#9CA3AF"
        variant="label"
        overflow="hidden"
        whiteSpace="nowrap"
        fontFamily="Satoshi"
        textOverflow="ellipsis"
        fontWeight="500"
      >
        {label === 'token' ? tokenSymbol : 'MOVE'}
      </Typography>
    </Button>
  );
};

export default SelectToken;
