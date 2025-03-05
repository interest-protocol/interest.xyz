/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Motion,
  Theme,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { ChevronDownSVG, MovementLogoSVG } from '@/components/svg';
import { wrapperVariants } from '@/constants/wrapper-variants';
import { useIsFirstRender } from '@/hooks';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { useNetworkContext } from '@/lib/aptos-provider/network/network.hooks';

import OptionItem from './menu-options/option-item';

const BOX_ID = 'network-box-id';

const MovementNetwork: FC = () => {
  const { colors } = useTheme() as Theme;
  const isFirstRender = useIsFirstRender();
  const [isOpen, setIsOpen] = useState(false);
  const { changeNetwork } = useNetworkContext();

  const closeNetworkDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    setIsOpen(false);
  };

  const handleOpenMenu = () => {
    setIsOpen(not);
  };

  const networkBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeNetworkDropdown);

  return (
    <Box
      id={BOX_ID}
      display="flex"
      position="relative"
      flexDirection="column"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={networkBoxRef}
    >
      <Button
        gap="xs"
        display="flex"
        cursor="pointer"
        variant="tonal"
        borderRadius="xs"
        color="onSurface"
        alignItems="center"
        nHover={{ color: 'onSurface' }}
        onClick={handleOpenMenu}
        bg={isOpen ? `${colors.primary}14` : 'container'}
        PrefixIcon={
          <MovementLogoSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        }
        SuffixIcon={
          <Motion
            display="flex"
            color="onSurface"
            alignItems="center"
            animate={{ rotate: isOpen ? '180deg' : '0deg' }}
          >
            <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          </Motion>
        }
      >
        <Typography
          mr="0.5rem"
          size="large"
          variant="label"
          color="onSurface"
          width="max-content"
        >
          Mainnet
        </Typography>
      </Button>
      {!isFirstRender && (
        <Motion
          right="0"
          zIndex={4}
          top="3.4rem"
          bg="container"
          width="14.5rem"
          borderRadius="m"
          overflow="hidden"
          position="absolute"
          variants={wrapperVariants}
          textTransform="capitalize"
          initial={isOpen ? 'closed' : 'open'}
          animate={isOpen ? 'open' : 'closed'}
          pointerEvents={isOpen ? 'auto' : 'none'}
          boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12);"
        >
          <OptionItem
            index={0}
            totalItems={1}
            selected={true}
            onClick={() => changeNetwork('mainnet')}
          >
            <MovementLogoSVG maxWidth="2rem" maxHeight="2rem" />
            <Box>Mainnet</Box>
          </OptionItem>
        </Motion>
      )}
    </Box>
  );
};

export default MovementNetwork;
