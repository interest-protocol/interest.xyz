import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import ModalTokenSearch from './modal-token-search';
import NotFound from './not-found';
import {
  ModalTokenBodyProps,
  SearchTokenForm,
} from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenBody: FC<ModalTokenBodyProps> = ({
  tokens,
  loading,
  handleSelectToken,
}) => {
  const { control } = useFormContext<SearchTokenForm>();

  const search = useWatch({ control, name: 'search' });

  const isSearchAddres = search.startsWith('0x');

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search?.toLowerCase() || '') ||
      token.name.toLowerCase().includes(search?.toLowerCase() || '')
  );

  if (!isSearchAddres)
    return (
      <Box px="m" py="s">
        <Box display="flex" gap="2xs" alignItems="center">
          <Typography variant="body" size="small" color="outline">
            {filteredTokens.length} Coin{filteredTokens.length !== 1 ? 's' : ''}
          </Typography>
          {loading && <ProgressIndicator variant="loading" size={12} />}
        </Box>
        <Box
          py="m"
          gap="s"
          display="grid"
          gridTemplateColumns={['1fr', '1fr 1fr']}
        >
          {filteredTokens.length ? (
            filteredTokens.map((token) => (
              <TokenModalItem
                key={v4()}
                selected={false}
                symbol={token.symbol}
                iconUri={token.iconUri}
                onClick={() => handleSelectToken(token)}
                isFA={token.standard === TokenStandard.FA}
              />
            ))
          ) : (
            <NotFound />
          )}
        </Box>
      </Box>
    );

  return (
    <ModalTokenSearch search={search} handleSelectToken={handleSelectToken} />
  );
};

export default ModalTokenBody;
