import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import UnverifiedCoinList from './unverified-list';
import VerifiedList from './verified-list';

const CoinSection: FC = () => (
  <Box
    gap="s"
    display="flex"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
  >
    <Box display="flex" flexDirection="column" width="100%" gap="xs">
      <VerifiedList />
      <UnverifiedCoinList />
    </Box>
  </Box>
);

export default CoinSection;
