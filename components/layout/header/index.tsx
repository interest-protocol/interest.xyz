import { Box, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { v4 } from 'uuid';

import Wallet from '@/components/wallet';
import useEventListener from '@/hooks/use-event-listener';

import { SIDEBAR_ITEMS } from '../sidebar/sidebar.data';
import SwapTopSlider from '../top-coins-slider';
import LogoWrapper from './logo-wrapper';

const Header: FC = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? !window.matchMedia('(min-width: 64em)').matches
      : false
  );

  const { asPath, push } = useRouter();

  const goToPath = (path: any) => {
    if (path.startsWith('https://'))
      return window.open(path, '_blank')?.focus();

    push(path);
  };

  const handleSetDesktop = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(min-width: 64em)').matches;
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetDesktop, true);

  return (
    <Box display="flex" position="relative" flexDirection="column">
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        py={isMobile ? 'xs' : '1rem'}
        px={isMobile ? 'm' : '2xl'}
        justifyContent="space-between"
      >
        <LogoWrapper isShort={isMobile} />
        {!isMobile && (
          <Box
            gap="2rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            py="1rem"
            px="2rem"
            nHover={{
              bg: '#9CA3AF33',
              backdropFilter: 'blur(8px)',
              boxShadow: '0px 0px 0px 1px #9CA3AF4D',
            }}
            borderRadius="full"
            transition="all 350ms ease-in-out"
          >
            {SIDEBAR_ITEMS.map(({ name, path }) => (
              <Box
                key={v4()}
                display="flex"
                cursor="pointer"
                height="1.375rem"
                borderRadius="xs"
                alignItems="center"
                alignContent="center"
                fontWeight={asPath === path ? '500' : '400'}
                nHover={{ color: '#fff' }}
                onClick={() => goToPath(path)}
                transition="all 350ms ease-in-out"
                color={asPath === path ? '#fff' : '#9CA3AF'}
              >
                <Typography
                  size="large"
                  color="inherit"
                  variant="label"
                  fontSize="1rem"
                  fontFamily="Inter"
                  width="max-content"
                  lineHeight="1.5rem"
                  textTransform="capitalize"
                >
                  {name}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        <Box
          top="0"
          gap="xs"
          left="0"
          right="0"
          zIndex="1"
          width="15rem"
          position="relative"
          alignItems="center"
          justifyContent="flex-end"
          gridTemplateColumns="1fr 1fr"
          display={['none', 'none', 'none', 'flex']}
        >
          <Wallet />
        </Box>
        <Box
          p="xs"
          top="0"
          gap="xs"
          zIndex={3}
          overflowX="auto"
          position="relative"
          alignItems="center"
          px={['unset', 'xl']}
          justifyContent="space-between"
          display={['flex', 'flex', 'flex', 'none']}
          boxShadow="0 1.5rem 2.875rem -0.625rem rgba(13, 16, 23, 0.16)"
        >
          <Box display="flex" alignItems="center">
            <Wallet />
          </Box>
        </Box>
      </Box>
      {asPath === '/' && (
        <Box display="block">
          <SwapTopSlider />
        </Box>
      )}
    </Box>
  );
};

export default Header;
