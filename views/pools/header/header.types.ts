import { Dispatch, ReactNode, SetStateAction } from 'react';

import { PoolTabEnum } from '../pools.types';

export interface SearchMobileProps {
  handleClose: () => void;
  showSearchView: boolean;
}

export interface HeaderProps {
  setTab: Dispatch<SetStateAction<PoolTabEnum>>;
  currentTab: PoolTabEnum;
}

export interface HeaderInfoCardProps {
  title: string;
  value: ReactNode;
  isLoading?: boolean;
  type: PoolHeaderIconEnum;
}

export enum PoolHeaderIconEnum {
  volume,
  tvl,
  apr,
}
