import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import SwapBottomMenu from '@/components/layout/bottom-menu';

import ErrorBoundary from '../error-boundary';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title,
  children,
  background,
}) => (
  <ErrorBoundary>
    <Box
      flex="1"
      as="aside"
      height="100vh"
      display={['flex', 'flex', 'flex', 'grid']}
      overflowX="hidden"
      position="relative"
      flexDirection="column"
      gridTemplateRows="auto 1fr auto"
      overflowY="auto"
    >
      <Header />
      <Box mx="auto" width="98%" bg="surface" borderRadius="1rem">
        {background}
        <Box
          flex="1"
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          py={['unset', 'unset', 'unset', '2xl']}
          mb="1rem"
        >
          <Box
            m="0"
            mt="unset"
            width="100%"
            height="100%"
            display="flex"
            variant="container"
            flexDirection="column"
            px={['m', 'l', 'l', 'xl']}
          >
            <Box
              flex="1"
              as="main"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box flex="1" pb="2rem">
                {title && (
                  <Typography
                    textAlign="center"
                    color="onSurface"
                    variant="display"
                    size="medium"
                    my="3rem"
                  >
                    {title}
                  </Typography>
                )}
                {children}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
    <SwapBottomMenu />
  </ErrorBoundary>
);

export default Layout;
