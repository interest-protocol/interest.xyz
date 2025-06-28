import { Box, Modal, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronDownSVG, ChevronRightSVG, MinusSVG } from '@/components/svg';
import TokenIcon from '@/components/token-icon';
import { Network } from '@/constants';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import { ZERO_BIG_NUMBER } from '@/utils';
import SelectTokenModal from '@/views/components/select-token-modal';

import { IPoolForm } from '../../pools.types';
import { SelectTokenProps } from '../find-pool-modal.types';

const SelectToken: FC<SelectTokenProps> = ({
  index,
  canRemove,
  handleRemoveSelectToken,
}) => {
  const network = useNetwork<Network>();

  const [isOpen, setIsOpen] = useState(false);

  const { setValue, control, getValues } = useFormContext<IPoolForm>();

  const currentSymbol = useWatch({
    control,
    name: `tokenList.${index}.symbol`,
  });
  const currentStandard = useWatch({
    control,
    name: `tokenList.${index}.standard`,
  });

  const onSelect = async (metadata: AssetMetadata) => {
    if (
      getValues('tokenList')?.some((token) => token.symbol === metadata.symbol)
    )
      return;

    setValue(`tokenList.${index}`, {
      ...metadata,
      value: '',
      locked: false,
      valueBN: ZERO_BIG_NUMBER,
    });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Box display="flex" alignItems="center" gap="s">
        <Box
          p="2xs"
          width="100%"
          display="flex"
          cursor="pointer"
          color="onSurface"
          borderRadius="xs"
          border="1px solid"
          alignItems="center"
          onClick={openModal}
          nHover={{
            bg: 'container',
            borderColor: 'onSurface',
          }}
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          {currentSymbol ? (
            <Box display="flex" alignItems="center" gap="m" p="xs">
              <TokenIcon
                withBg
                network={network}
                symbol={currentSymbol}
                rounded={currentStandard === TokenStandard.COIN}
              />
              <Typography variant="body" size="medium">
                {currentSymbol}
              </Typography>
            </Box>
          ) : (
            <Typography size="large" variant="body" p="xs">
              Select Token
            </Typography>
          )}
          {currentSymbol ? (
            <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          ) : (
            <ChevronRightSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          )}
        </Box>
        {canRemove && (
          <Box
            bg="container"
            nHover={{
              bg: 'surface',
            }}
            display="flex"
            minWidth="2rem"
            minHeight="2rem"
            cursor="pointer"
            alignItems="center"
            borderRadius="full"
            justifyContent="center"
            onClick={() => handleRemoveSelectToken(index)}
          >
            <MinusSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          </Box>
        )}
      </Box>

      <Modal
        {...{
          isOpen,
          custom: true,
          opaque: false,
          allowClose: true,
          onClose: closeModal,
        }}
      >
        <Motion
          animate={{ scale: 1 }}
          initial={{ scale: 0.85 }}
          transition={{ duration: 0.3 }}
        >
          <SelectTokenModal closeModal={closeModal} onSelect={onSelect} />
        </Motion>
      </Modal>
    </>
  );
};

export default SelectToken;
