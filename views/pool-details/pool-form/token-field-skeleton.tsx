import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { PoolFormActiveProps } from './pool-form.types';

const TokenFieldSkeleton: FC<PoolFormActiveProps> = ({ isDepositForm }) => {
  return (
    <Box display="flex" flexDirection="column" gap="xs">
      <Box
        py="xs"
        px="xs"
        display="flex"
        cursor="pointer"
        borderRadius="s"
        alignItems="center"
        bg="lowestContainer"
        justifyContent="space-between"
        transition="all 350ms ease-in-out"
      >
        <Box display="flex" gap="xs" alignItems="center">
          <Box display="flex" alignItems="center" gap="s">
            <Box gap="s" display="flex" alignItems="center">
              <Skeleton
                width="calc(1.5rem * 1.66)"
                height="calc(1.5rem * 1.66)"
              />
              <Skeleton width="4.5rem" height="1.7rem" />
            </Box>
          </Box>
        </Box>
      </Box>
      {isDepositForm && (
        <Box display="flex" justifyContent="space-between">
          <Button
            p="2xs"
            gap="0.5rem"
            display="flex"
            color="onSurface"
            variant="outline"
            alignItems="center"
            borderColor="transparent"
            nHover={{ bg: 'unset', borderColor: 'primary' }}
            className="loading-balance"
          >
            <Skeleton width="4.5rem" />
          </Button>
          <Button
            px="xs"
            py="2xs"
            fontSize="xs"
            variant="outline"
            borderRadius="2xs"
            color="onSurface"
          >
            MAX
          </Button>
        </Box>
      )}{' '}
    </Box>
  );
};

export default TokenFieldSkeleton;
