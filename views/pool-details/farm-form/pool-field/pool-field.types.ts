import { PoolFarmsOption, PoolOption } from '../../pool-details.types';

export interface PoolFieldsProps extends PoolFormProps {
  index: number;
}

export interface PoolFormProps {
  poolOptionView: PoolOption | PoolFarmsOption;
}

export interface NameProps {
  name: `tokenList.${number}` | 'lpCoin';
}
