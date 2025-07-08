import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Input from '../input';
import SwapFormFieldSlider from '../input/swap-manager-slider';
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
        bg="container"
        borderRadius="s"
        flexDirection="column"
      >
        <Input label="from" />
        <SwapFormFieldSlider />
      </Box>
      <Box
        my="-1.4rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SwapFlipToken />
      </Box>
      <Box
        py="s"
        px="xl"
        display="flex"
        bg="container"
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
