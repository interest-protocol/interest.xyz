import mongoose, { Document, Model, Schema } from 'mongoose';

const modelName = 'InterestDEXQueryMovementMainnet';

export interface Coin {
  type: string;
  symbol: string;
  amount: string;
}

export interface SwapData {
  coinIn: Coin;
  coinOut: Coin;
}

export interface TokenData {
  coin: Coin;
}

export interface PoolData {
  poolId: string;
  coinA: Coin;
  coinB: Coin;
}

export type Quest = {
  quest: {
    address: string;
    txDigest: string;
    timestamp: number;
  } & (
    | {
        kind: 'swap';
        data: SwapData;
      }
    | {
        kind: 'createToken';
        data: TokenData;
      }
    | {
        kind: 'createAndDeployToken';
        data: TokenData;
      }
    | {
        kind: 'createPool';
        data: PoolData;
      }
    | {
        kind: 'addLiquidity';
        data: PoolData;
      }
    | {
        kind: 'wrapCoin';
        data: TokenData;
      }
  );
  profileField: string;
  network: string;
};

export type QuestDocument = Document & Quest;

export const QuestSchema = new Schema({
  address: {
    index: true,
    type: String,
    required: true,
  },
  timestamp: {
    index: true,
    type: Number,
    required: true,
  },
  txDigest: {
    type: String,
    required: true,
  },
  kind: {
    index: true,
    type: String,
    required: true,
  },
  data: {
    required: true,
    type: Schema.Types.Mixed,
  },
});

export default (mongoose.models[modelName] as Model<QuestDocument>) ||
  mongoose.model<QuestDocument>(modelName, QuestSchema);
