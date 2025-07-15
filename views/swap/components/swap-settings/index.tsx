import { Box, ToggleButton } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ISwapSettings } from '../swap.types';
import InputWrapper from './input-wrapper';
import SwapSettingsWrapper from './swap-setting-wrapper';

const SwapSettings: FC = () => {
  const { register, control, setValue } = useFormContext<ISwapSettings>();

  const [infiniteApproval] = useWatch({
    control,
    name: ['infiniteApproval'],
  });

  return (
    <SwapSettingsWrapper>
      <Box gap="0.75rem" display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <InputWrapper
            altInfo="%"
            title="Slippage tolerance"
            register={register}
            name="slippageTolerance"
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <InputWrapper
            altInfo="min"
            title="Transaction deadline"
            register={register}
            name="transactionDeadline"
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="2.75rem"
        >
          <InputWrapper
            altInfo="min"
            title="Infinite approval"
            Input={
              <Box
                display="flex"
                cursor="pointer"
                position="relative"
                mr="-0.5rem"
              >
                <ToggleButton
                  width="100rem"
                  name="Fixed Supply"
                  defaultValue={infiniteApproval}
                  disabled={false}
                  onClick={() =>
                    setValue('infiniteApproval', not(infiniteApproval))
                  }
                />
              </Box>
            }
            register={register}
            name="infiniteApproval"
          />
        </Box>
      </Box>
    </SwapSettingsWrapper>
  );
};

export default SwapSettings;
