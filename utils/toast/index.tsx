import { TransactionResponse } from '@aptos-labs/ts-sdk';
import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import toast from 'react-hot-toast';

import { EXPLORER_URL } from '@/constants';

export const showTXSuccessToast = async (
  tx: TransactionResponse,
  network: Network
): Promise<void> => {
  const explorerLink = EXPLORER_URL[network](`txblock/${tx.hash}`);

  toast(
    <a target="__blank" rel="noreferrer nofollow" href={explorerLink}>
      <Box display="flex" alignItems="center">
        <Typography
          size="medium"
          color="accent"
          variant="body"
          cursor="pointer"
          textDecoration="underline"
        >
          Explorer
        </Typography>
      </Box>
    </a>
  );
};
