import useCurvePool from '../use-curve-pool';
import useV2Pool from '../use-v2-pool';

export const usePool = (address: string) => {
  const v2Pool = useV2Pool(address);
  const curvePool = useCurvePool(address);

  return v2Pool.pool ? v2Pool : curvePool;
};
