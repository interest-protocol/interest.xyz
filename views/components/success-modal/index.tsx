import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { LogoSVG } from '@/components/svg';

import { SuccessModalProps } from './success-modal.types';

const SuccessModal: FC<PropsWithChildren<SuccessModalProps>> = ({
  children,
}) => (
  <Box width="100%">
    <Box display="flex" flexDirection="column" gap="m" mb="2rem">
      {children}
    </Box>
    <Box display="flex" justifyContent="center" mb="0.5rem">
      <Typography
        alignItems="center"
        textAlign="center"
        color="onSurface"
        variant="headline"
        size="small"
        display="flex"
        fontSize="1rem"
        lineHeight="1.406rem"
      >
        BY:
      </Typography>
      <Box
        ml="0.75rem"
        display="flex"
        minWidth="8.5rem"
        minHeight="2.5rem"
        alignItems="center"
        justifyContent="center"
        color="onSurface"
      >
        <LogoSVG width="100%" maxWidth="8.5rem" maxHeight="2.5rem" />
      </Box>
    </Box>
    <a
      href="https://www.interest.xyz"
      target="_blank"
      rel="noopener, noreferrer"
    >
      <Typography
        alignItems="center"
        textAlign="center"
        variant="body"
        size="small"
        display="flex"
        lineHeight="1.5rem"
        fontSize="0.75rem"
        width="fit-content"
        mx="auto"
        color="primary"
        mt="0.5rem"
      >
        www.interest.xyz
      </Typography>
    </a>
  </Box>
);

export default SuccessModal;
