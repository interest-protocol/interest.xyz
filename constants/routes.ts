/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Swap = 'swap',
  Pools = 'pools',
  DCA = 'dca',
  Analytics = 'analytics',
  PoolCreate = 'pool-create',
  Leaderboard = 'leaderboard',
  PoolDetails = 'pool-details',
  TokenCreate = 'token-create',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Swap]: '/',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.DCA]: '/dca',
  [RoutesEnum.Analytics]: '/analytics',
  [RoutesEnum.Leaderboard]: '/leaderboard',
  [RoutesEnum.PoolCreate]: '/pools/create',
  [RoutesEnum.TokenCreate]: '/create-token',
  [RoutesEnum.PoolDetails]: '/pools/details',
};
