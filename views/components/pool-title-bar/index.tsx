import { Network } from '@interest-protocol/interest-aptos-v2';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { ArrowLeftSVG } from '@/components/svg';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { IPoolForm } from '@/views/pools/pools.types';

import { PoolTitleBarProps } from './pool-title-bar.types';

const PoolTitleBar: FC<PoolTitleBarProps> = ({
  onBack,
  loading,
  centerTile,
}) => {
  const network = useNetwork<Network>();
  const { control } = useFormContext<IPoolForm>();

  const tokens = useWatch({
    control: control,
    name: 'tokenList',
  });

  const name = tokens.reduce(
    (acc, token) => `${acc ? `${acc} • ` : ''}${token?.symbol ?? ''}`,
    ''
  );

  return (
    <>
      <Box
        py="m"
        px="xl"
        mb="xs"
        gap="m"
        mx="auto"
        bg="container"
        display="flex"
        maxWidth="65rem"
        borderRadius="xs"
        alignItems="center"
        mt={['5xl', '5xl', '5xl', 'xl']}
      >
        <Button
          isIcon
          mr="xs"
          variant="text"
          onClick={onBack}
          color="onSurface"
          nHover={{ bg: 'surface' }}
        >
          <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
        </Button>
        <Box
          display="flex"
          gap="s"
          flexWrap="wrap"
          justifyContent="space-between"
          minWidth={['auto', 'auto', '90%', '93.5%']}
        >
          <Box display="flex" gap="s" flexWrap="wrap">
            <Typography
              size="large"
              color="onSurface"
              variant="headline"
              textAlign="center"
              ml={centerTile ? 'auto' : ''}
              fontSize={['xl', 'xl', '3xl', '5xl']}
            >
              {loading ? (
                <Box display="flex" gap="s">
                  <Skeleton width="5rem" height="2rem" />
                  <Skeleton width="5rem" height="2rem" />
                </Box>
              ) : (
                <Box as="span" fontFamily="Satoshi">
                  {name}
                </Box>
              )}
            </Typography>
          </Box>
          <Box display="flex" gap="s">
            <Box
              gap="s"
              ml="auto"
              alignItems="center"
              display={['none', 'none', 'flex', 'flex']}
            >
              {!loading ? (
                tokens.map(({ symbol }) => (
                  <TokenIcon
                    withBg
                    key={v4()}
                    symbol={symbol}
                    network={network}
                  />
                ))
              ) : (
                <Box display="flex" gap="s">
                  <Skeleton
                    width="calc(1.5rem * 1.66)"
                    height="calc(1.5rem * 1.66)"
                  />
                  <Skeleton
                    width="calc(1.5rem * 1.66)"
                    height="calc(1.5rem * 1.66)"
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PoolTitleBar;
