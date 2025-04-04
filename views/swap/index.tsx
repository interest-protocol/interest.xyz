import { Box, Button } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import Layout from '@/components/layout';
import { PodiumSVG } from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

import Input from './input';
import SwapFormFieldSlider from './input/swap-manager-slider';
import ToInput from './input/to-input';
import SwapBackground from './swap-background';
import SwapButton from './swap-button';
import SwapFlipToken from './swap-flip-token';
import SwapManager from './swap-manager';

const Swap: FC = () => (
  <Layout background={<SwapBackground />}>
    <Box height="100%" display="flex">
      <Box
        gap="l"
        mx="auto"
        display="flex"
        borderRadius="l"
        alignContent="center"
        flexDirection="column"
        justifyContent="center"
        px={['2xs', 'xl', 'xl', '7xl']}
        width={['100%', '100%', '100%', '39.75rem']}
      >
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
      </Box>
      <SwapManager />
    </Box>
    <Link href={Routes[RoutesEnum.Leaderboard]}>
      <Button
        left="1rem"
        bottom="1rem"
        variant="tonal"
        color="onSurface"
        position="absolute"
        PrefixIcon={<PodiumSVG maxWidth="1rem" maxHeight="1rem" width="10)%" />}
      >
        Leaderboard
      </Button>
    </Link>
  </Layout>
);

export default Swap;
