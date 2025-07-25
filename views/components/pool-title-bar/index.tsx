import { Box, Button, Tabs, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { ArrowLeftSVG } from '@/components/svg';
import { FARMS_BY_LP, Network } from '@/constants';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { IPoolForm } from '@/views/pools/pools.types';

import { PoolTitleBarProps } from './pool-title-bar.types';

const PoolTitleBar: FC<PoolTitleBarProps> = ({
  onBack,
  loading,
  centerTile,
  modeState: [mode, setMode],
}) => {
  const { getValues } = useFormContext<IPoolForm>();
  const isFarm = !!FARMS_BY_LP[getValues('pool.poolAddress')];

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
        mb="xs"
        gap="m"
        mx="auto"
        bg="container"
        display="flex"
        flexWrap="wrap"
        maxWidth="65rem"
        borderRadius="xs"
        flexDirection={['column', 'column', 'row', 'row']}
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        px={['m', 'm', 'xl']}
      >
        <Box
          display="flex"
          gridTemplateColumns="2rem 1fr"
          width={['100%', '100%', '100%', 'auto']}
        >
          <Button
            isIcon
            mr="xs"
            p="unset"
            variant="text"
            onClick={onBack}
            color="onSurface"
            nHover={{ bg: 'surface' }}
          >
            <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
          </Button>
          <Box
            gap="s"
            flex="1"
            mx="auto"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            pr="2rem"
          >
            <Box display="flex" gap="s" flexWrap="wrap" alignItems="center">
              <Box display="flex" gap="s">
                <Box gap="s" ml="auto" display="flex" alignItems="center">
                  {!loading ? (
                    tokens.map(({ symbol, standard, iconUri }) => (
                      <TokenIcon
                        withBg
                        key={v4()}
                        size="1rem"
                        url={iconUri}
                        symbol={symbol}
                        network={network}
                        rounded={standard === TokenStandard.COIN}
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
              <Typography
                size="medium"
                variant="title"
                color="onSurface"
                textAlign="center"
                ml={centerTile ? 'auto' : ''}
              >
                {loading || !tokens.length || !tokens[0]?.symbol ? (
                  <Box display="flex" gap="s">
                    <Skeleton width="2rem" height="2rem" />
                    <Skeleton width="2rem" height="2rem" />
                  </Box>
                ) : (
                  <Box as="span" fontFamily="Satoshi">
                    {name}
                  </Box>
                )}
              </Typography>
            </Box>
          </Box>
          <Box />
        </Box>
        {isFarm && (
          <Box
            display="flex"
            justifyContent={['center', 'flex-end']}
            mx={['auto', 'auto', 'auto', 'unset']}
          >
            <Tabs
              type="circle"
              onChangeTab={setMode}
              defaultTabIndex={mode}
              items={['Liquidity', 'Farm']}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default PoolTitleBar;
