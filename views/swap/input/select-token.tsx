import { Network } from '@interest-protocol/interest-aptos-v2';
import { Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronDownSVG } from '@/components/svg';
import TokenIcon from '@/components/token-icon';
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

  const sanitizedToken =
    label === 'to' && !currentToken?.manuallySelected
      ? undefined
      : currentToken;

  const { symbol: currentSymbol } = sanitizedToken ?? {};

  const formattedSymbol = currentSymbol ?? type ?? 'Select token';

  const onSelect = async (metadata: AssetMetadata) => {
    if (metadata.type === opposite?.type) return;

    if (
      metadata.standard === opposite?.standard &&
      metadata.symbol === opposite?.symbol
    ) {
      setValue(label === 'to' ? 'from' : 'to', {
        ...currentToken,
        value: '',
      });
    }

    setValue(label, {
      ...metadata,
      value: '',
      valueBN: ZERO_BIG_NUMBER,
      manuallySelected: true,
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

  const isToWithoutToken = label === 'to' && !currentSymbol;
  const style = label == 'to' && isToWithoutToken;

  return (
    <Button
      py="3xs"
      height="2rem"
      fontSize="s"
      variant="tonal"
      color="onSurface"
      borderRadius="l"
      disabled={swapping}
      onClick={openModal}
      bg={style ? '#B4C5FF' : '#030712'}
      pl={style ? '0.75rem' : '0'}
      pr={style ? '0.75rem' : '0.75rem'}
      opacity={swapping ? 0.7 : 1}
      nHover={{ ...(isToWithoutToken ? { bg: '#B4C5FF' } : {}) }}
      PrefixIcon={
        !isToWithoutToken && currentSymbol ? (
          <TokenIcon
            withBg
            size="1.5rem"
            network={network}
            symbol={currentSymbol}
            rounded={sanitizedToken?.standard === TokenStandard.COIN}
          />
        ) : undefined
      }
    >
      {isToWithoutToken ? (
        <Typography
          size="medium"
          variant="label"
          color="#002A78"
          fontWeight="500"
          fontFamily="Inter"
          textAlign="center"
          fontSize="0.875rem"
        >
          Select token
        </Typography>
      ) : (
        <Typography
          size="large"
          maxWidth="12ch"
          color="#9CA3AF"
          variant="label"
          overflow="hidden"
          whiteSpace="nowrap"
          fontFamily="Satoshi"
          textOverflow="ellipsis"
          width={['0px', 'auto']}
          fontWeight="500"
          display={[currentSymbol ? 'none' : 'block', 'block']}
        >
          {formattedSymbol}
        </Typography>
      )}
      <ChevronDownSVG
        maxHeight="1.25rem"
        maxWidth="1.25rem"
        width="100%"
        color={isToWithoutToken ? '#002A78' : undefined}
      />
    </Button>
  );
};

export default SelectToken;
