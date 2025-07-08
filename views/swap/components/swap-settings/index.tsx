import {
  Box,
  Button,
  Motion,
  TextField,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import { TimesSVG } from '@/components/svg';
import { LOCAL_STORAGE_VERSION } from '@/constants';
import { useModal } from '@/hooks/use-modal';

import { ISwapSettings } from '../swap.types';

const SwapSettings: FC = () => {
  const { handleClose } = useModal();
  const { setValue } = useFormContext();

  const formTmpSettings = useForm<ISwapSettings>({
    defaultValues: {
      slippageTolerance: '0.5',
      transactionDeadline: '10',
      infiniteApproval: true,
    },
  });

  const onConfirm = () => {
    const settings = formTmpSettings.getValues();

    setValue('settings', settings);
    localStorage.setItem(
      `${LOCAL_STORAGE_VERSION}-movement-dex-settings`,
      JSON.stringify(settings)
    );
    handleClose();
  };

  return (
    <Motion
      layout
      gap="1rem"
      bg="#121313"
      display="flex"
      maxHeight="33rem"
      overflow="hidden"
      color="onSurface"
      borderRadius="s"
      padding="1.25rem"
      flexDirection="column"
      width={['90vw', '32rem']}
      boxShadow="0 0 5px #3334"
      border="1px solid #FFFFFF1A"
      maxWidth={['20.25rem', 'unset']}
      transition={{ duration: 0.3 }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          size="large"
          fontSize="xl"
          variant="title"
          fontWeight="700"
          fontFamily="Inter"
        >
          Settings
        </Typography>
        <Button variant="text" isIcon onClick={handleClose} mr="-0.5rem">
          <TimesSVG maxWidth="0.8rem" maxHeight="0.8rem" width="100%" />
        </Button>
      </Box>
      <Box gap="0.625px" mb="0.625rem" display="flex" flexDirection="column">
        <Box
          display="flex"
          py="0.171875rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            size="large"
            variant="body"
            color="#9CA3AF"
            fontSize="1rem"
            fontWeight="500"
            fontFamily="Inter"
          >
            Slippage tolerance
          </Typography>
          <TextField
            Suffix="%"
            type="text"
            fontSize="medium"
            placeholder="0.5"
            nPlaceholder={{ opacity: 0.7 }}
            {...formTmpSettings.register('slippageTolerance')}
            fieldProps={{
              width: '6rem',
              height: '2.75rem',
              borderRadius: 'xs',
              background: '#202123',
              color: '#FFFFFF',
            }}
          />
        </Box>
        <Box
          display="flex"
          py="0.171875rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            size="large"
            variant="body"
            color="#9CA3AF"
            fontSize="1rem"
            fontWeight="400"
            fontFamily="Inter"
          >
            Transaction deadline
          </Typography>
          <TextField
            type="number"
            Suffix="mins"
            placeholder="10"
            fontSize="medium"
            nPlaceholder={{ opacity: 0.7 }}
            fieldProps={{
              width: '6rem',
              height: '2.75rem',
              borderRadius: 'xs',
              background: '#202123',
              color: '#FFFFFF',
            }}
            {...formTmpSettings.register('transactionDeadline')}
          />
        </Box>
        <Box
          mt="0.625rem"
          display="flex"
          py="0.171875rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            size="large"
            variant="body"
            fontSize="1rem"
            color="#9CA3AF"
            fontWeight="400"
            fontFamily="Inter"
          >
            Infinite approval
          </Typography>

          <Box
            width="2.75rem"
            height="1.5rem"
            cursor="pointer"
            position="relative"
            borderRadius="0.75rem"
            transition="all 0.3s ease"
            bg={
              formTmpSettings.watch('infiniteApproval') ? '#8BA5FF' : '#374151'
            }
            onClick={() => {
              formTmpSettings.setValue(
                'infiniteApproval',
                !formTmpSettings.watch('infiniteApproval')
              );
            }}
          >
            <input
              type="checkbox"
              id="hinfiniteApproval"
              checked={formTmpSettings.watch('infiniteApproval')}
              onChange={(e) =>
                formTmpSettings.setValue('infiniteApproval', e.target.checked)
              }
              style={{ display: 'none' }}
            />
            <Box
              top="0.14rem"
              bg="#FFFFFF"
              width="1.25rem"
              height="1.25rem"
              borderRadius="50%"
              position="absolute"
              transition="all 0.3s ease"
              left={
                formTmpSettings.watch('infiniteApproval')
                  ? '1.4rem'
                  : '0.125rem'
              }
            />
          </Box>
        </Box>
      </Box>
      <Box
        flex="1"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Button
          px="1rem"
          py="0.5rem"
          width="100%"
          bg="#B4C5FF"
          color="#002A78"
          variant="filled"
          display="flex"
          fontSize="1rem"
          fontWeight="500"
          fontFamily="Inter"
          lineHeight="1.5rem"
          borderRadius="12px"
          justifyContent="center"
          onClick={onConfirm}
          nHover={{
            bg: '#8BA5FF',
          }}
          nFocus={{
            bg: '#1F1F1F',
          }}
          boxShadow="0px 1px 2px 0px #0000000D"
        >
          Confirm
        </Button>
      </Box>
    </Motion>
  );
};

export default SwapSettings;
