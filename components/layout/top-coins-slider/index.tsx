import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TOKENS } from '@/constants/coins';
import {
  AssetMetadata,
  AssetWithPrice,
} from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';

import TopCoinItem from './top-coins-item';

const SwapTopSlider: FC = () => {
  const { setValue, getValues } = useFormContext();

  const handleTokenSelect = (token: AssetWithPrice) => onSelect(token);

  const onSelect = async (metadata: AssetMetadata) => {
    const [currentToken, opposite] = getValues(['to', 'from']);

    if (metadata.type == opposite.type) return;

    if (
      metadata.standard === opposite.standard &&
      metadata.symbol === opposite.symbol
    )
      setValue('from', {
        ...currentToken,
        value: '',
      });

    setValue('to', {
      ...metadata,
      value: '',
      valueBN: ZERO_BIG_NUMBER,
    });
  };

  return (
    <Box
      px="m"
      display={
        TOKENS?.length ? ['flex', 'flex', 'flex', 'none', 'none'] : 'none'
      }
    >
      <Box
        py="s"
        gap="l"
        width="100%"
        display="flex"
        overflowX="scroll"
        alignItems="center"
        scrollbarWidth="none"
        backdropFilter="blur(40px)"
        scrollSnapType="x mandatory"
        WebkitBackdropFilter="blur(40px)"
      >
        {TOKENS?.map((token, index) => (
          <TopCoinItem
            key={index}
            token={token}
            handleTokenSelect={() => handleTokenSelect(parseToMetadata(token))}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SwapTopSlider;
