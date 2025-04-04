interface SwapLeaderboardItem {
  swaps: number;
  sender: string;
  volume: number;
}

export interface LeaderboardAPIResponse {
  totalItems: number;
  data: ReadonlyArray<SwapLeaderboardItem>;
}
