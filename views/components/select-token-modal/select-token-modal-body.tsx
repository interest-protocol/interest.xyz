import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { TOKENS } from '@/constants/coin-fa';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata } from '@/utils';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';

import FetchingToken from './fetching-token';
import ModalTokenBody from './modal-token-body';
import NotFound from './not-found';
import {
  SelectTokenModalBodyProps,
  TokenOrigin,
} from './select-token-modal.types';

const SelectTokenModalBody: FC<SelectTokenModalBodyProps> = ({
  control,
  isOutput,
  handleSelectToken,
}) => {
  const isHideLPToken = useReadLocalStorage<boolean>(
    `${LOCAL_STORAGE_VERSION}-movement-dex-hide-lp-token`
  );

  const { coins, loading } = useCoins();
  const validCoins = coins.filter(
    ({ standard, symbol }) =>
      (!isOutput || standard === TokenStandard.FA) &&
      (isHideLPToken ? !symbol.includes('sr-LpFa') : true)
  );

  const filterSelected = useWatch({ control, name: 'filter' });

  if (filterSelected === TokenOrigin.Strict)
    return (
      <ModalTokenBody
        loading={false}
        handleSelectToken={handleSelectToken}
        tokens={TOKENS.map((metadata) =>
          parseToMetadata(metadata as unknown as CoinMetadata | FAMetadata)
        )}
      />
    );

  if (!validCoins.length && loading) return <FetchingToken />;

  const noWalletToShow =
    filterSelected == TokenOrigin.Wallet && !validCoins?.length;

  if (filterSelected === TokenOrigin.Wallet && !noWalletToShow)
    return (
      <ModalTokenBody
        loading={loading}
        tokens={validCoins}
        handleSelectToken={handleSelectToken}
      />
    );

  return <NotFound />;
};

export default SelectTokenModalBody;
