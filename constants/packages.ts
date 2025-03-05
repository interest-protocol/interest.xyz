import { Network } from '@interest-protocol/interest-aptos-v2';

export const OBJECTS = {
  [Network.MovementMainnet]: {
    REGISTRY:
      '0xa82dfa032afd911aa4a7953d5ecbf6a33f8e2d1b8f0f379667b141933e5c7582',
  },
};

export const PACKAGES = {
  [Network.MovementMainnet]: {
    DEX: '0x6cd108f303c318cdef1bbbf309e23f97ef9648fdc0e2e6a9d2ef2db014f9504c',
    UTILS: '0x46d23d852e4ead896cf91d8d0ef47c147d80355517edd2ef81dac19b7c3248ae',
    AIRDROP:
      '0x35770416e5918031841afa8e9ad2076f2f9e0dd45fa4fc9effd1fdabf4db654b',
  },
};

export const AMM_CURVES = {
  [Network.MovementMainnet]: {
    STABLE: `${PACKAGES[Network.MovementMainnet].DEX}::curves::Stable`,
    VOLATILE: `${PACKAGES[Network.MovementMainnet].DEX}::curves::Volatile`,
  },
};
