import { Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronDownSVG } from '@/components/svg';
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

import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label }) => {
  const network = useNetwork<Network>();
  const { setModal, handleClose } = useModal();
  const { setValue, control } = useFormContext();

  const [currentToken, type, swapping, opposite] = useWatch({
    control,
    name: [
      label,
      `${label}.type`,
      'swapping',
      `${label === 'to' ? 'from' : 'to'}`,
    ],
  });

  const { symbol: currentSymbol } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };

  const formattedSymbol = currentSymbol
    ? currentSymbol
    : !currentSymbol && type
      ? type
      : 'Select token';

  const onSelect = async (metadata: AssetMetadata) => {
    if (metadata.type == opposite.type) return;

    if (
      metadata.standard === opposite.standard &&
      metadata.symbol === opposite.symbol
    )
      setValue(label === 'to' ? 'from' : 'to', {
        ...currentToken,
        value: '',
      });

    setValue(label, {
      ...metadata,
      value: '',
      valueBN: ZERO_BIG_NUMBER,
    });

    if (label === 'from') {
      setValue('to.value', '');
      setValue('to.valueBN', ZERO_BIG_NUMBER);
    }
  };

  const openModal = () =>
    !swapping &&
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal
          onSelect={onSelect}
          closeModal={handleClose}
          isOutput={label === 'to'}
        />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Button
      py="2xs"
      pr="s"
      fontSize="s"
      variant="tonal"
      color="onSurface"
      borderRadius="xs"
      disabled={swapping}
      onClick={openModal}
      bg="highestContainer"
      opacity={swapping ? 0.7 : 1}
      pl={currentSymbol ? '2xs' : 'm'}
      {...(currentSymbol && {
        PrefixIcon: (
          <TokenIcon
            withBg
            size="1.1rem"
            network={network}
            symbol={currentSymbol}
            rounded={currentToken.standard === TokenStandard.COIN}
          />
        ),
      })}
    >
      <Typography
        size="large"
        maxWidth="12ch"
        variant="label"
        overflow="hidden"
        whiteSpace="nowrap"
        fontFamily="Satoshi"
        textOverflow="ellipsis"
        width={['0px', 'auto']}
        display={[currentSymbol ? 'none' : 'block', 'block']}
      >
        {formattedSymbol}
      </Typography>
      <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
    </Button>
  );
};

export default SelectToken;
