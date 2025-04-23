export enum PoolDetailsTabOption {
  Detail,
  Advance,
}

export enum PoolDetailsMode {
  Liquidity,
  Farm,
}

export enum PoolOption {
  Deposit,
  Withdraw,
}

export enum PoolFarmsOption {
  Stake,
  Unstake,
}

export interface PoolDetailsFormProps {
  mode: PoolDetailsMode;
}
