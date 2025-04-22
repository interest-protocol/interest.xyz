import { ReactNode } from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { SWRResponse } from 'swr';

import { IPoolForm } from '@/views/pools/pools.types';

export interface FieldProps {
  getValues: UseFormGetValues<IPoolForm>;
}

export interface FarmPreviewWrapperHeaderProps {
  isStake?: boolean;
}

export interface FarmPreviewProps
  extends FarmPreviewWrapperHeaderProps,
    FieldProps {
  onSubmit: ReactNode;
}

export interface FarmPreviewWrapperProps extends FarmPreviewProps {
  fees?: SWRResponse<Array<number> | undefined>;
}
