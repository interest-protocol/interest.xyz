import useSWR from 'swr';

import { LIMIT } from './leaderboard.data';
import { LeaderboardAPIResponse } from './leaderboard.types';

export const useLeaderboard = (page: number) =>
  useSWR<LeaderboardAPIResponse>([useLeaderboard.name, page], async () =>
    fetch(
      `https://leaderboard-api-staging.up.railway.app/api/v1/swaps/leaderboard?page=${page}&pageSize=${LIMIT}`
    ).then((res) => res.json())
  );
