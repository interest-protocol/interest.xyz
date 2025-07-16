import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CogsSVG } from '@/components/svg';
import Input from '@/views/swap/components/input';
import ToInput from '@/views/swap/components/input/to-input';
import SwapFlipToken from '@/views/swap/components/swap-flip-token';

const TradeDCA: FC = () => (
  <Box
    p="1.5rem"
    gap="1rem"
    mt="1.5rem"
    width="100%"
    bg="#9CA3AF1A"
    display="flex"
    flexDirection="column"
    borderRadius="0.75rem"
  >
    <Box
      width="100%"
      display="flex"
      mb="0.75rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        size="medium"
        variant="title"
        color="#FFFFFF"
        fontWeight="600"
        fontSize="1.125rem"
      >
        Trade DCA
      </Typography>

      <Box
        role="button"
        lineHeight="0"
        display="flex"
        cursor="pointer"
        color="onSurface"
        alignItems="center"
        aria-label="Settings"
        onClick={() => {}}
        transition="transform 500ms ease-in-out"
        nHover={{ transform: 'rotate(180deg)' }}
      >
        <CogsSVG maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
      </Box>
    </Box>
    <Box position="relative">
      <Box
        p="1rem"
        gap="0.5rem"
        display="flex"
        bg="#9CA3AF1A"
        height="8.156rem"
        flexDirection="column"
        borderRadius="0.75rem"
      >
        <Input label="from" />
      </Box>
      <Box
        my="-1.4rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SwapFlipToken type="swap" />
      </Box>
      <Box
        p="1rem"
        gap="0.5rem"
        display="flex"
        bg="#9CA3AF1A"
        height="8.156rem"
        flexDirection="column"
        borderRadius="0.75rem"
      >
        <ToInput />
      </Box>
    </Box>
  </Box>
);

export default TradeDCA;
