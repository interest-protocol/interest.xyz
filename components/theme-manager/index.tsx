import 'react-loading-skeleton/dist/skeleton.css';

import { Global, ThemeProviderProps } from '@emotion/react';
import {
  darkTheme,
  ThemeProvider as InterestThemeProvider,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { SkeletonTheme } from 'react-loading-skeleton';

import { TOAST_DURATION } from '@/constants';
import { GlobalStyles } from '@/styles';

const ThemeManager: FC<Omit<ThemeProviderProps, 'theme'>> = ({ children }) => (
  <InterestThemeProvider theme={darkTheme}>
    <Global styles={GlobalStyles} />
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          border: '1px solid',
          borderRadius: darkTheme.radii.m,
          color: darkTheme.colors.onSurface,
          background: darkTheme.colors.surface,
          borderColor: darkTheme.colors.onPrimaryContainer,
        },
        duration: TOAST_DURATION,
      }}
    />
    <SkeletonTheme baseColor="#99BBFF28" highlightColor="#99BBFF14">
      {children}
    </SkeletonTheme>
  </InterestThemeProvider>
);

export default ThemeManager;
