import { Dispatch, SetStateAction } from 'react';

import { PoolDetailsMode } from '@/views/pool-details/pool-details.types';
export interface PoolTitleBarProps {
  loading?: boolean;
  onBack: () => void;
  centerTile?: boolean;
  modeState: [PoolDetailsMode, Dispatch<SetStateAction<PoolDetailsMode>>];
}
