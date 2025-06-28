import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronRightSVG } from '@/components/svg';
import TokenIcon from '@/components/token-icon';
import { Network } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import { ZERO_BIG_NUMBER } from '@/utils';
import SelectTokenModal from '@/views/components/select-token-modal';

import { CreatePoolForm } from '../../pool-create.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ index, isMobile }) => {
  const network = useNetwork<Network>();
  const { setModal, handleClose } = useModal();
  const { control, getValues, setValue } = useFormContext<CreatePoolForm>();

  const currentToken = useWatch({
    control,
    name: `tokens.${index}`,
  });

  const { type, symbol: currentSymbol } = currentToken;

  const formattedSymbol = currentSymbol
    ? currentSymbol
    : !currentSymbol && type
      ? type
      : 'Select token';

  const onSelect = async (metadata: AssetMetadata) => {
    if (getValues('tokens')?.some((token) => token.type === metadata.type))
      return;

    setValue(`tokens.${index}`, {
      ...metadata,
      value: '',
      valueBN: ZERO_BIG_NUMBER,
    });
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
        height={formattedSymbol === '' ? '2.5rem' : ''}
        bg={
          currentSymbol || formattedSymbol === type
            ? 'transparent'
            : 'highestContainer'
        }
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
          width="100%"
          cursor="pointer"
          variant="label"
          maxWidth="12ch"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          size={isMobile ? 'large' : 'small'}
        >
          {formattedSymbol}
        </Typography>
        {!currentSymbol && formattedSymbol !== type && (
          <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
        )}
      </Button>
    </Box>
  );
};

export default SelectToken;
