import { PoolOption } from '../../pool-details.types';

export interface PoolFieldsProps extends PoolFormProps {
  index: number;
}

export interface PoolFormProps {
  poolOptionView: PoolOption;
}

export interface MaxButtonProps {
  index: number;
  name: `tokenList.${number}` | 'lpCoin';
}
