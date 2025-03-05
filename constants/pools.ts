import { Pools } from '@/interface';

export const POOLS: ReadonlyArray<Pools> = [];

export const fasByPool = POOLS.map(({ faX, faY }) => [faX, faY]);
