import { ReactNode } from 'react';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export interface EarnCardFormProps {
  isRewards?: boolean;
  token: AssetMetadata;
}

export interface EarnCardProps extends EarnCardFormProps {
  label: string;
  balance: string;
  primaryButton: ReactNode;
  secondaryButton?: ReactNode;
}
