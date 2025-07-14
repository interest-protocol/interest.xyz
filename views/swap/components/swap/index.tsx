import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Input from '../input';
import ToInput from '../input/to-input';
import SwapButton from '../swap-button';
import SwapFlipToken from '../swap-flip-token';
import SwapManager from '../swap-manager';
import AdditionalInfo from './additional-info';

const Swap: FC = () => (
  <>
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
      <SwapButton />
      <AdditionalInfo />
    </Box>
    <SwapManager />
  </>
);

export default Swap;
