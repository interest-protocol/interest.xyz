import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import { PoolCardTokenInfoProps } from './pool-card.types';

const PoolCardInfo: FC<PoolCardTokenInfoProps> = ({ coins }) => {
  const network = useNetwork<Network>();

  return (
    <Box
      my="xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        mb="m"
        gap="m"
        display="flex"
        height="2.5rem"
        justifyContent="center"
        alignItems="center"
        alignSelf="stretch"
      >
        {coins.map(({ symbol, iconUri, standard }) => (
          <TokenIcon
            withBg
            key={v4()}
            url={iconUri}
            symbol={symbol}
            network={network}
            rounded={standard === TokenStandard.COIN}
          />
        ))}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        {
          <Typography
            gap="xs"
            size="small"
            variant="body"
            display="flex"
            fontSize="1rem"
            fontWeight="700"
            color="onSurface"
            textAlign="center"
            lineHeight="1.7rem"
          >
            {coins.flatMap((coin, index) => [
              index ? <>{' • '}</> : '',
              coin.symbol || <Skeleton key={v4()} width="4rem" />,
            ])}
          </Typography>
        }
      </Box>
    </Box>
  );
};

export default PoolCardInfo;
