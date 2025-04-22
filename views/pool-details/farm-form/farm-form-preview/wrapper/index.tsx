import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { FarmPreviewWrapperProps } from '../preview.types';
import PoolPreviewWrapperFooter from './footer';
import PoolPreviewWrapperHeader from './header';

const FarmPreviewWrapper: FC<PropsWithChildren<FarmPreviewWrapperProps>> = ({
  fees,
  isStake,
  onSubmit,
  children,
  getValues,
}) => (
  <Motion
    layout
    display="flex"
    bg="container"
    height="41rem"
    overflowY="auto"
    minWidth="22rem"
    maxHeight="90vh"
    maxWidth="27rem"
    color="onSurface"
    borderRadius="xs"
    flexDirection="column"
    boxShadow="0 0 5px #3334"
    transition={{ duration: 0.3 }}
  >
    <PoolPreviewWrapperHeader isStake={isStake} />
    <Box
      px="xl"
      display="flex"
      height="100%"
      flexDirection="column"
      justifyContent="space-between"
    >
      {children}
      <PoolPreviewWrapperFooter
        fees={fees}
        onSubmit={onSubmit}
        getValues={getValues}
      />
    </Box>
  </Motion>
);

export default FarmPreviewWrapper;
