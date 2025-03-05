import { Network } from '@interest-protocol/interest-aptos-v2';
import { PACKAGES } from '@interest-protocol/interest-aptos-v2';

export const AMM_CURVES = {
  [Network.MovementMainnet]: {
    STABLE: `${PACKAGES[Network.MovementMainnet].INTEREST_V2}::curves::Stable`,
    VOLATILE: `${PACKAGES[Network.MovementMainnet].INTEREST_V2}::curves::Volatile`,
  },
};
