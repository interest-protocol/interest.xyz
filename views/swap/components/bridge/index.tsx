import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Input from '../input';
import SelectorInput from '../input/selector-input';
import SwapButton from '../swap-button';
import SwapFlipToken from '../swap-flip-token';
import SwapManager from '../swap-manager';

const Bridge: FC = () => (
  <>
    <Box position="relative">
      <Box
        py="l"
        px="xl"
        mb="4px"
        display="flex"
        bg="#9CA3AF1A"
        borderRadius="s"
        flexDirection="column"
      >
        <Input label="from" />
      </Box>
      <Box display="flex" flexDirection="column">
        <SelectorInput label="from" />
        <Box
          my="-1.4rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <SwapFlipToken type="bridge" />
        </Box>
        <SelectorInput label="to" />
      </Box>
      <SwapButton />
    </Box>
    <SwapManager />
  </>
);

export default Bridge;
