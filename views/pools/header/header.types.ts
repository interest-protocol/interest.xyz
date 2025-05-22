import { Dispatch, SetStateAction } from 'react';

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
  value: string;
  isLoading?: boolean;
  type: PoolHeaderIconEnum;
}

export enum PoolHeaderIconEnum {
  volume,
  tvl,
  apr,
}
