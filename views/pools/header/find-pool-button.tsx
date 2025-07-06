import {
  Box,
  Button,
  Motion,
  Theme,
  useTheme,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import { SearchSVG } from '@/components/svg';
import { useModal } from '@/hooks/use-modal';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { ZERO_BIG_NUMBER } from '@/utils';

import FindPoolModal from '../find-pool-modal';
import { IPoolForm } from '../pools.types';

const FindPoolButton: FC = () => {
  const { colors } = useTheme() as Theme;
  const { setModal, handleClose } = useModal();

  const form = useFormContext<IPoolForm>();

  const openModal = () => {
    form.setValue('tokenList', [
      {
        name: '',
        type: '',
        symbol: '',
        decimals: 0,
        value: '0',
        locked: false,
        valueBN: ZERO_BIG_NUMBER,
        standard: TokenStandard.FA,
      },
      {
        name: '',
        type: '',
        symbol: '',
        decimals: 0,
        value: '0',
        locked: false,
        valueBN: ZERO_BIG_NUMBER,
        standard: TokenStandard.FA,
      },
    ]);

    setModal(
      <FormProvider {...form}>
        <Motion
          animate={{ scale: 1 }}
          initial={{ scale: 0.85 }}
          transition={{ duration: 0.3 }}
        >
          <FindPoolModal closeModal={handleClose} />
        </Motion>
      </FormProvider>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );
  };

  return (
    <>
      <Box
        gap="2xs"
        alignItems="center"
        display={['none', 'none', 'none', 'flex']}
      >
        <Button
          py="s"
          variant="tonal"
          color="onSurface"
          bg="highContainer"
          width="max-content"
          onClick={openModal}
          nHover={{
            bg: `${colors.primary}14`,
          }}
          SuffixIcon={
            <Box
              ml="m"
              width="1rem"
              height="1rem"
              display="flex"
              justifyContent="center"
            >
              <SearchSVG maxHeight="100%" maxWidth="100%" width="100%" />
            </Box>
          }
        >
          find pool
        </Button>
      </Box>
      <Box gap="xs" display={['flex', 'flex', 'flex', 'none']}>
        <Button
          isIcon
          width="1.5rem"
          bg="onSurface"
          color="surface"
          height="1.5rem"
          variant="filled"
          onClick={openModal}
          nHover={{ bg: 'outline' }}
        >
          <Box height="1.25rem" width="1.25rem">
            <SearchSVG maxHeight="1.25rem" maxWidth="1.25rem" width="100%" />
          </Box>
        </Button>
      </Box>
    </>
  );
};

export default FindPoolButton;
