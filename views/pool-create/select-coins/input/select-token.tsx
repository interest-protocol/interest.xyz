import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronRightSVG } from '@/components/svg';
import TokenIcon from '@/components/token-icon';
import { PRICE_TYPE } from '@/constants/prices';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';
import SelectTokenModal from '@/views/components/select-token-modal';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ index, isMobile }) => {
  const { setModal, handleClose } = useModal();
  const network = useNetwork<Network>();

  const { control, getValues, setValue } = useFormContext<CreatePoolForm>();

  const currentToken = useWatch({
    control,
    name: `tokens.${index}`,
  });

  const { symbol: currentSymbol } = currentToken;

  const onSelect = async (metadata: AssetMetadata) => {
    if (getValues('tokens')?.some((token) => token.symbol === metadata.symbol))
      return;

    setValue(`tokens.${index}`, {
      ...metadata,
      value: '',
      usdPrice: null,
      valueBN: ZERO_BIG_NUMBER,
    });

    if (PRICE_TYPE[metadata.symbol])
      fetch(
        `https://rates-api-staging.up.railway.app/api/fetch-quote?coins=${metadata.type}`,
        {
          method: 'GET',
          headers: {
            network: 'MOVEMENT',
          },
        }
      )
        .then((response) => response.json())
        .then(({ data }) =>
          setValue(
            `tokens.${index}.usdPrice`,
            Number(formatDollars(data.price))
          )
        )
        .catch(() => null);
  };

  const openModal = () =>
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal closeModal={handleClose} onSelect={onSelect} />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Box
      p="xs"
      position="relative"
      minWidth={['8rem', '8rem', '8rem', '8rem', '10rem']}
    >
      <Button
        p="2xs"
        fontSize="s"
        width="100%"
        variant="tonal"
        bg={currentSymbol ? 'transparent' : 'highestContainer'}
        color="onSurface"
        borderRadius="xs"
        onClick={openModal}
        {...(currentSymbol && {
          PrefixIcon: (
            <TokenIcon
              withBg
              network={network}
              symbol={currentSymbol}
              rounded={currentToken.standard === TokenStandard.COIN}
            />
          ),
        })}
      >
        <Typography
          p="xs"
          variant="label"
          whiteSpace="nowrap"
          width="100%"
          size={isMobile ? 'large' : 'small'}
        >
          {currentSymbol || 'Select token'}
        </Typography>
        {!currentSymbol && (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Button>
    </Box>
  );
};

export default SelectToken;
