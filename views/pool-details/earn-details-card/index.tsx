import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { EarnCardProps } from './earn-details-card.types';
import EarnCardForm from './form';

const EarnCard: FC<EarnCardProps> = ({
  label,
  token,
  balance,
  isRewards,
  primaryButton,
  secondaryButton,
}) => (
  <Box
    px="xl"
    pt={0}
    pb="xl"
    flex="1"
    gap="xs"
    height="100%"
    display="flex"
    borderRadius="2xs"
    flexDirection="column"
    justifyContent="space-between"
    bg={isRewards ? '#003EA8' : 'container'}
  >
    <Box>
      <Box
        py="xl"
        borderBottom="1px dashed"
        borderBottomColor={isRewards ? 'onSurface' : 'outlineVariant'}
      >
        <Typography
          size="large"
          variant="title"
          fontWeight="400"
          color="onSurface"
          lineHeight="1.75rem"
          textTransform="capitalize"
        >
          {label}
        </Typography>
      </Box>
      <Box mt="m" display="flex" flexDirection="column" gap={['xl', 'unset']}>
        <Typography
          size="medium"
          variant="body"
          color="outline"
          fontWeight="400"
          lineHeight="1.75rem"
          textTransform="capitalize"
        >
          Balance: {balance}
        </Typography>
        <EarnCardForm token={token} isRewards={isRewards} />
      </Box>
    </Box>
    <Box
      gap="xs"
      display="flex"
      alignItems="flex-end"
      justifyContent="flex-end"
    >
      {secondaryButton}
      {primaryButton}
    </Box>
  </Box>
);

export default EarnCard;
