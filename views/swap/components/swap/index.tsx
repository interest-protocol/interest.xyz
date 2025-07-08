import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Input from '../input';
import ToInput from '../input/to-input';
import SwapButton from '../swap-button';
import SwapFlipToken from '../swap-flip-token';
import SwapManager from '../swap-manager';

const Swap: FC = () => (
  <>
    <Box position="relative">
      <Box
        py="l"
        px="xl"
        display="flex"
        bg="#9CA3AF1A"
        borderRadius="s"
        flexDirection="column"
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
        py="s"
        px="xl"
        display="flex"
        bg="#9CA3AF1A"
        borderRadius="s"
        flexDirection="column"
      >
        <ToInput />
      </Box>
      <SwapButton />
    </Box>
    <SwapManager />
  </>
);

export default Swap;
