import useSWR from 'swr';

import { Metric, MetricItemProps } from '@/views/pools/pools.types';

export interface IAPIMetrics {
  summary: MetricItemProps;
  totalPages: number;
  data: ReadonlyArray<Metric>;
}

export const useMetrics = (page: number = 1) =>
  useSWR(
    [useMetrics.name, page],
    async () => {
      const metrics = await fetch(
        `https://api.interestlabs.io/v1/movement/mainnet/curve/metrics?page=${page}&limit=30`
      ).then((res) => res.json?.());

      return metrics as IAPIMetrics;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
