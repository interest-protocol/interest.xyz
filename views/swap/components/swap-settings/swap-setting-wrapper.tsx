import { Box, Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { TimesSVG } from '@/components/svg';
import { useModal } from '@/hooks/use-modal';

const SwapSettingsWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { handleClose } = useModal();

  const onConfirm = () => {
    handleClose();
  };

  return (
    <Motion
      layout
      gap="1rem"
      p="1.5rem"
      bg="#121313"
      display="flex"
      maxHeight="33rem"
      overflow="hidden"
      onClick={(e) => e.stopPropagation()}
      color="onSurface"
      borderRadius="s"
      flexDirection="column"
      width={['90vw', '32rem']}
      boxShadow="0 0 5px #3334"
      border="1px solid #FFFFFF1A"
      transition={{ duration: 0.3 }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography
          size="large"
          fontSize="18px"
          variant="title"
          fontWeight="400"
          fontFamily="Inter"
          lineHeight="1.5rem"
        >
          Settings
        </Typography>
        <Button
          isIcon
          variant="text"
          width="1.5rem"
          height="1.5rem"
          onClick={handleClose}
        >
          <TimesSVG maxWidth="0.875rem" maxHeight="0.875rem" width="100%" />
        </Button>
      </Box>
      {children}
      <Box
        flex="1"
        display="flex"
        alignItems="flex-end"
        justifyContent="center"
      >
        <Button
          py="0.5rem"
          width="100%"
          variant="filled"
          display="flex"
          fontSize="1rem"
          fontFamily="Inter"
          lineHeight="1.5rem"
          borderRadius="0.75rem"
          justifyContent="center"
          onClick={onConfirm}
          nHover={{
            bg: '#8BA5FF',
          }}
        >
          Confirm
        </Button>
      </Box>
    </Motion>
  );
};

export default SwapSettingsWrapper;
