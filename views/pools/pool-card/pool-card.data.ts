export const TAG_COLOR: Record<string, Record<'color' | 'bg', string>> = {
  curve: {
    color: '#88f',
    bg: 'transparent',
  },
  concentrated: {
    color: '#88f',
    bg: 'transparent',
  },
  v2: {
    color: '#a4f',
    bg: 'transparent',
  },
  volatile: {
    color: '#fa0',
    bg: 'transparent',
  },
  stable: {
    color: '#faa',
    bg: 'transparent',
  },
  earn: {
    color: 'onSuccessContainer',
    bg: 'successContainer',
  },
};

export const TAG_TOOLTIP: Record<string, string> = {
  curve: 'Concentrated Liquidity without \nconstant active management.',
  concentrated: `Concentrated Liquidity without \nconstant active management.`,
  v2: 'v2',
  volatile: 'Designed for uncorrelated assets.',
  stable: 'Stable',
  earn: 'Earn MOVE when \nproviding liquidity.',
};
