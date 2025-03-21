import useSWR from 'swr';

import { useInterestV2Dex } from '../use-interest-dex-v2';

const useSrAmmPoolConfig = () => {
  const dexV2 = useInterestV2Dex();

  const { data: config, ...rest } = useSWR([useSrAmmPoolConfig.name], () =>
    dexV2.getConfig()
  );
  return { config, ...rest };
};

export default useSrAmmPoolConfig;
