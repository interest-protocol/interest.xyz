import useSWR from 'swr';

import { useInterestDex } from '../use-interest-dex';

const useSrAmmPoolConfig = () => {
  const dex = useInterestDex();

  const { data: config, ...rest } = useSWR([useSrAmmPoolConfig.name], () =>
    dex.getConfig()
  );
  return { config, ...rest };
};

export default useSrAmmPoolConfig;
