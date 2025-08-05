import { Network } from '@interest-protocol/interest-aptos-v2';
import mongoose, { Document, Model, Schema } from 'mongoose';

const modelName = 'InterestDEXMetricsMovementMainnet';

export interface Metrics {
  network: Network;
  weeklyTXs: Map<string, number>;
  weeklyUsers: Map<string, number>;
  weeklySwaps: Map<string, number>;
  weeklyDeposits: Map<string, number>;
  weeklyWrapCoins: Map<string, number>;
  weeklyCreatePools: Map<string, number>;
  weeklyCreateTokens: Map<string, number>;
  weeklyCreateAndDeployTokens: Map<string, number>;
}

export type MetricsDocument = Document & Metrics;

export const MetricsSchema = new Schema({
  network: { index: true, type: String, required: true },
  weeklyTXs: { type: Schema.Types.Map },
  weeklyUsers: { type: Schema.Types.Map },
  weeklySwaps: { type: Schema.Types.Map },
  weeklyDeposits: { type: Schema.Types.Map },
  weeklyWrapCoins: { type: Schema.Types.Map },
  weeklyCreatePools: { type: Schema.Types.Map },
  weeklyCreateTokens: { type: Schema.Types.Map },
  weeklyCreateAndDeployTokens: { type: Schema.Types.Map },
});

export default (mongoose.models[modelName] as Model<MetricsDocument>) ||
  mongoose.model<MetricsDocument>(modelName, MetricsSchema);
