import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ICreateTokenForm } from '../../create-token.types';
import CreateTokenPoolSelectCoins from './create-token-pool-select-coins';

const CreateTokenFormPoolForm: FC = () => {
  const { control } = useFormContext<ICreateTokenForm>();
  const supply = useWatch({ control, name: 'supply' });
  const active = useWatch({ control, name: 'pool.active' });

  if (!active || !supply) return null;

  return <CreateTokenPoolSelectCoins />;
};

export default CreateTokenFormPoolForm;
