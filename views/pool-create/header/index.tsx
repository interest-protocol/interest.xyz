import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ArrowLeftSVG } from '@/components/svg';

import { CreatePoolProps } from './create-pool-header.types';

const CreatePoolHeader: FC<CreatePoolProps> = ({ name, onBack }) => (
  <Box
    pb="m"
    px="xl"
    mx="auto"
    mb="2.875rem"
    display="flex"
    flexWrap="wrap"
    maxWidth="65rem"
    borderRadius="xs"
    position="relative"
    mt={['5xl', '5xl', '5xl', 'xl']}
    gap={['unset', 'm', 'm', 'm', 'm']}
  >
    <Button
      isIcon
      mr="xs"
      top="0"
      variant="text"
      onClick={onBack}
      color="onSurface"
      nHover={{
        bg: 'lowestContainer',
      }}
    >
      <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
    </Button>
    <Typography
      size="large"
      color="onSurface"
      variant="headline"
      textAlign="center"
      whiteSpace="pre-line"
      fontSize={['xl', 'xl', '3xl', '5xl']}
    >
      {name}
    </Typography>
  </Box>
);

export default CreatePoolHeader;
