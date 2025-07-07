import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useMetrics } from '@/hooks';

import { IPoolForm } from '../pools.types';
import { PoolHeaderIconEnum } from './header.types';
import HeaderInfoCard from './header-info-card';

const HeaderMetrics: FC = () => {
  const { data: metrics, isLoading } = useMetrics();

  const { control } = useFormContext<IPoolForm>();

  const positionList = useWatch({ control, name: 'positionList' });

  if (!isLoading && !metrics?.data)
    return (
      <Box
        width="100%"
        display="flex"
        mb="m"
        gap="m"
        bg="#f6465d7d"
        p="s"
        borderRadius="1rem"
        justifyContent="center"
      >
        <a
          href="http://discord.gg/movementlabsxyz"
          target="_blank"
          rel="noreferrer"
        >
          <Typography
            variant="headline"
            size="small"
            textAlign="center"
            color="#909094"
            fontSize={['0.85rem', '0.85rem', '1rem']}
          >
            Movement RPC under Maintenance. Contact us on discord
          </Typography>
        </a>
      </Box>
    );

  return (
    <Box
      width="100%"
      mb="m"
      display="grid"
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']}
      gap="m"
    >
      <HeaderInfoCard
        title="TVL"
        isLoading={isLoading}
        value={metrics?.summary?.tvl || '0'}
        type={PoolHeaderIconEnum.tvl}
      />
      <HeaderInfoCard
        isLoading={isLoading}
        title="Cumulative Volume"
        type={PoolHeaderIconEnum.volume}
        value={metrics?.summary?.volume || '0'}
      />
      <HeaderInfoCard
        isLoading={isLoading}
        title="Trading Volume (24H)"
        type={PoolHeaderIconEnum.volume}
        value={metrics?.summary?.volume1D || '0'}
      />
      <HeaderInfoCard
        title="User Position"
        isLoading={!positionList || positionList.length > 1}
        value={
          positionList
            ? `${Object.values(positionList).reduce(
                (totalAmount: number, amount: number) => totalAmount + amount,
                0
              )}`
            : '0'
        }
        type={PoolHeaderIconEnum.tvl}
      />
    </Box>
  );
};

export default HeaderMetrics;
