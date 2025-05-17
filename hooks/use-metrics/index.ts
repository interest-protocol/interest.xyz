import useSWR from 'swr';

import { Metric } from '@/views/pools/pools.types';

export interface IAPIMetrics {
  total: number;
  totalPages: number;
  data: ReadonlyArray<Metric>;
}

export const useMetrics = (page: number = 1) =>
  useSWR(
    [useMetrics.name, page],
    async () => {
      const metrics = await fetch(
        `https://api.interestlabs.io/v1/movement/testnet/curve/metrics?page=${page}&limit=30`
      ).then((res) => res.json?.());

      return metrics as IAPIMetrics;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
