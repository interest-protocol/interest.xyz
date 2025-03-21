import { POOLS } from '@/constants/pools';
import { Pool, PoolTypeEnum } from '@/interface';

export const POOL_DATA: ReadonlyArray<Pool> = POOLS.map(({ address, fas }) => ({
  isVolatile: true,
  poolType: PoolTypeEnum.Curve,
  poolAddress: address.toString(),
  coins: fas.map((fa) => fa.toString()),
}));
