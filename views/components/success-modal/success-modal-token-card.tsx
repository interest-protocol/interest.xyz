import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { ChevronDoubleLeftSVG } from '@/components/svg';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { formatMoney } from '@/utils';

import { SuccessModalTokenCardProps } from './success-modal.types';

const SuccessModalTokenCard: FC<SuccessModalTokenCardProps> = ({
  to,
  from,
  withoutAmount,
}) => {
  const network = useNetwork<Network>();
  return (
    <Box
      py="m"
      px="s"
      gap="s"
      bg="surface"
      display="flex"
      borderRadius="xs"
      justifyContent="center"
    >
      <Box display="flex" alignItems="center">
        <TokenIcon
          withBg
          size="1rem"
          network={network}
          symbol={from.symbol}
          rounded={from.standard === TokenStandard.COIN}
        />
        <Typography
          alignItems="center"
          textAlign="center"
          color="onSurface"
          variant="body"
          size="medium"
          display="flex"
          ml="s"
        >
          {`${!withoutAmount ? formatMoney(+from?.value) : ''} ${from.symbol}`}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" color="onSurface">
        <ChevronDoubleLeftSVG
          maxHeight="0.75rem"
          maxWidth="0.75rem"
          width="100%"
        />
      </Box>
      <Box display="flex" alignItems="center">
        <TokenIcon
          withBg
          size="1.1rem"
          symbol={to.symbol}
          network={network as Network}
          rounded={to.standard === TokenStandard.COIN}
        />
        <Typography
          alignItems="center"
          textAlign="center"
          color="onSurface"
          variant="body"
          size="medium"
          display="flex"
          ml="s"
        >
          {`${!withoutAmount ? formatMoney(+to?.value) : ''} ${to.symbol}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default SuccessModalTokenCard;
