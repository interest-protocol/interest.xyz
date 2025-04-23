import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';

import { usePool } from '@/hooks/use-pool';
import useSrAmmPoolConfig from '@/hooks/use-sr-pool-config';
import { IPool, SdkSrAmmConfig } from '@/interface';

import { IPoolForm } from '../pools/pools.types';

interface PoolDetailsProviderProps {
  address: string;
}

interface PoolDetailsContext {
  loading: boolean;
  config: SdkSrAmmConfig | undefined;
  pool: IPool | null | undefined;
}

const INITIAL: PoolDetailsContext = {
  pool: null,
  loading: true,
  config: undefined,
};

const poolDetailsContext = createContext<PoolDetailsContext>(INITIAL);

export const PoolDetailsProvider: FC<
  PropsWithChildren<PoolDetailsProviderProps>
> = ({ address, children }) => {
  const { Provider } = poolDetailsContext;
  const { config } = useSrAmmPoolConfig();
  const { pool, loading } = usePool(address);
  const { setValue, getValues } = useFormContext<IPoolForm>();

  useSWR([PoolDetailsProvider.name, pool?.poolAddress], async () => {
    if (pool) {
      setValue('pool', pool);
      if (pool.tokensMetadata)
        setValue(
          'tokenList',
          pool.tokensMetadata.map((metadata, index) => ({
            ...getValues('tokenList')[index],
            ...metadata,
          }))
        );
      setValue('lpCoin', {
        ...getValues('lpCoin'),
        ...pool.poolMetadata,
      });
    }
  });

  return <Provider value={{ loading, pool, config }}>{children}</Provider>;
};

export const usePoolDetails = () => useContext(poolDetailsContext);
