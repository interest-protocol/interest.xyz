import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';

import ConnectWalletButton from '@/components/wallet/connect-wallet';

const TradeDCAButton = () => {
  const { account } = useAptosWallet();

  return (
    <Box mt="0.75rem" display="flex" flexDirection="column">
      {account?.address ? (
        <Button
          height="2rem"
          variant="filled"
          borderRadius="s"
          justifyContent="center"
        >
          <Typography
            p="1rem"
            size="large"
            fontSize="1rem"
            variant="label"
            fontWeight="500"
            fontFamily="Inter"
            lineHeight="1.5rem"
          >
            Enter amount
          </Typography>
        </Button>
      ) : (
        <ConnectWalletButton />
      )}
    </Box>
  );
};

export default TradeDCAButton;
