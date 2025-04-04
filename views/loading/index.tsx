import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Loading from '@/components/loading';

const LoadingView: FC = () => (
  <Box
    width="100vw"
    height="100vh"
    display="flex"
    alignItems="center"
    position="relative"
    bg="lowestContainer"
    flexDirection="column"
    justifyContent="center"
  >
    <Loading />
  </Box>
);

export default LoadingView;
