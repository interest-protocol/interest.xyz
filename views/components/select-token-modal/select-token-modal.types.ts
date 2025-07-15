import { Control, UseFormSetValue } from 'react-hook-form';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export interface TokenModalItemProps {
  isFA: boolean;
  selected: boolean;
  onClick: () => void;
  token: AssetMetadata;
}

export interface SelectTokenModalProps {
  isOutput?: boolean;
  closeModal: () => void;
  onSelect: (metadata: AssetMetadata) => void;
}

export interface SelectTokenFilterProps {
  control: Control<SearchTokenForm>;
  setValue: UseFormSetValue<SearchTokenForm>;
}

export enum TokenOrigin {
  Strict,
  Wallet,
}

export interface SearchTokenForm {
  search: string;
  filter: TokenOrigin;
}

export interface SelectTokenModalBodyProps
  extends Pick<SelectTokenModalProps, 'isOutput'> {
  control: Control<SearchTokenForm>;
  handleSelectToken: (metadata: AssetMetadata) => void;
}

export interface ModalTokenBodyProps {
  loading: boolean;
  tokens: ReadonlyArray<AssetMetadata>;
  handleSelectToken: (metadata: AssetMetadata) => void;
}

export interface ModalTokenSearchProps {
  search: string;
  handleSelectToken: (metadata: AssetMetadata) => void;
}

export interface FavoriteTokensProps {
  onSelectToken: (metadata: AssetMetadata) => void;
}
