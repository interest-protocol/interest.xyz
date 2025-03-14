import { Box } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';

import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import { getCoinMetadata, parseToMetadata } from '@/utils';

import FetchingToken from './fetching-token';
import NotFound from './not-found';
import { ModalTokenSearchProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenSearch: FC<ModalTokenSearchProps> = ({
  search,
  handleSelectToken,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenMetadata, setTokenMetadata] = useState<AssetMetadata>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!search) return;

    const fetchMetadata = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const data = await getCoinMetadata(search);

        setTokenMetadata(parseToMetadata(data));
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [search]);

  if (isLoading) return <FetchingToken />;
  if (error || !tokenMetadata) return <NotFound />;

  return (
    <Box p="m">
      <TokenModalItem
        key={search}
        selected={false}
        symbol={tokenMetadata.symbol}
        iconUri={tokenMetadata.iconUri}
        onClick={() => handleSelectToken(tokenMetadata)}
        isFA={tokenMetadata.standard === TokenStandard.FA}
      />
    </Box>
  );
};

export default ModalTokenSearch;
