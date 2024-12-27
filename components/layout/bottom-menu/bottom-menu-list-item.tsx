import { Box, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { SwapBottomMenuListItemProps } from './bottom-menu.types';

const SwapBottomMenuListItem: FC<SwapBottomMenuListItemProps> = ({
  name,
  path,
}) => {
  const { asPath, push } = useRouter();

  const goToPath = (path: any) => {
    if (path.startsWith('https://'))
      return window.open(path, '_blank')?.focus();

    push(path);
  };

  return (
    <Box flex="1">
      <Box
        py="xl"
        px="xs"
        key={v4()}
        display="flex"
        cursor="pointer"
        height="1.375rem"
        borderRadius="xs"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        onClick={() => goToPath(path)}
        transition="all 350ms ease-in-out"
        bg={asPath === path ? 'primary' : ''}
        nHover={{ bg: asPath !== path ? 'outline' : '' }}
      >
        <Typography
          size="large"
          variant="label"
          color={asPath === path ? 'onPrimary' : 'white'}
          width="max-content"
          nHover={{
            opacity: 0.7,
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default SwapBottomMenuListItem;
