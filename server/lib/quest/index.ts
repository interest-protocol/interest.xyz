import { Network } from '@interest-protocol/interest-aptos-v2';

import dbConnect from '@/server';
import metrics from '@/server/model/metrics';
import QuestModel, {
  PoolData,
  Quest,
  SwapData,
  TokenData,
} from '@/server/model/quest';
import QuestProfileModel from '@/server/model/quest-profile';
import { getExactDayTimestamp, getFirstWeekDayTimestamp } from '@/utils';

type ProfileField =
  | 'swap'
  | 'wrapCoin'
  | 'createPool'
  | 'createToken'
  | 'addLiquidity'
  | 'createAndDeployToken';

type MetricField =
  | 'weeklySwaps'
  | 'weeklyDeposits'
  | 'weeklyWrapCoins'
  | 'weeklyCreatePools'
  | 'weeklyCreateTokens'
  | 'weeklyCreateAndDeployTokens';

type LastField =
  | 'lastSwapAt'
  | 'lastWrapCoinAt'
  | 'lastCreatePoolAt'
  | 'lastCreateTokenAt'
  | 'lastAddLiquidityAt'
  | 'lastCreateAndDeployTokenAt';

const lastFieldMap: Record<ProfileField, LastField> = {
  swap: 'lastSwapAt',
  wrapCoin: 'lastWrapCoinAt',
  createPool: 'lastCreatePoolAt',
  createToken: 'lastCreateTokenAt',
  addLiquidity: 'lastAddLiquidityAt',
  createAndDeployToken: 'lastCreateAndDeployTokenAt',
};

const metricsFieldMap: Record<ProfileField, MetricField> = {
  swap: 'weeklySwaps',
  wrapCoin: 'weeklyWrapCoins',
  addLiquidity: 'weeklyDeposits',
  createPool: 'weeklyCreatePools',
  createToken: 'weeklyCreateTokens',
  createAndDeployToken: 'weeklyCreateAndDeployTokens',
};

export const addQuest = async (
  quest: Omit<Quest, 'timestamp'>,
  profileField: ProfileField,
  network: Network
) => {
  await dbConnect();

  const questProfile = await findQuestProfile(quest.address);

  const todayTimestamp = getExactDayTimestamp();
  const weekTimestamp = getFirstWeekDayTimestamp();

  await updateMetrics(
    network,
    !questProfile.weeks?.includes(weekTimestamp),
    quest.kind
  );

  const finalQuest = { ...quest, timestamp: todayTimestamp };

  const doc = await QuestModel.create(finalQuest);
  await doc.save();

  if (questProfile[lastFieldMap[profileField]] === todayTimestamp)
    return finalQuest;

  questProfile[lastFieldMap[profileField]] = todayTimestamp;

  if (!questProfile.weeks?.includes(weekTimestamp))
    questProfile.weeks = [...(questProfile.weeks ?? []), weekTimestamp];

  await questProfile.save();

  return finalQuest;
};

export const findQuestProfile = async (address: string) => {
  await dbConnect();

  const questProfile = await QuestProfileModel.findOne({ address });

  return (
    questProfile ??
    QuestProfileModel.create({
      address,
      weeks: [],
      lastSwapAt: 0,
    })
  );
};

export const findSwapBySymbols = async (
  address: string,
  symbolIn: string,
  symbolOut: string
) => {
  await dbConnect();

  const swapQuests = await QuestModel.find({ address, kind: 'swap' })
    .lean()
    .exec();

  return swapQuests.find(
    ({ data }) =>
      (data as SwapData).coinIn.symbol === symbolIn &&
      (data as SwapData).coinOut.symbol === symbolOut
  );
};

export const findAddLiquidityBySymbols = async (
  address: string,
  symbolIn: string,
  symbolOut: string
) => {
  await dbConnect();

  const addLiquidityQuests = await QuestModel.find({
    address,
    kind: 'addLiquidity',
  })
    .lean()
    .exec();

  return addLiquidityQuests.find(
    ({ data }) =>
      (data as PoolData).coinA.symbol === symbolIn &&
      (data as PoolData).coinB.symbol === symbolOut
  );
};

export const findWrapBySymbol = async (symbol: string, address: string) => {
  await dbConnect();

  const wrapQuests = await QuestModel.find({ address, kind: 'wrap' })
    .lean()
    .exec();

  return wrapQuests.find(({ data }) => (data as TokenData).symbol === symbol);
};

export const findMetrics = async (network: Network) => {
  await dbConnect();

  const metric = await metrics.findOne({ network });

  return (
    metric ??
    metrics.create({
      network,
      weeklyTXs: {},
      weeklyUsers: {},
      weeklySwaps: {},
      weeklyDeposits: {},
      weeklyWrapCoins: {},
      weeklyCreatePools: {},
      weeklyCreateTokens: {},
      weeklyCreateTokensAndDeploy: {},
    })
  );
};

export const updateMetrics = async (
  network: Network,
  newUser: boolean,
  kind: ProfileField
) => {
  await dbConnect();
  const firstWeekDay = getFirstWeekDayTimestamp();

  const metric = await findMetrics(network);

  metric.weeklyTXs.set(
    String(firstWeekDay),
    (metric.weeklyTXs.get(String(firstWeekDay)) ?? 0) + 1
  );

  if (!metric[metricsFieldMap[kind]]) metric[metricsFieldMap[kind]] = new Map();

  metric[metricsFieldMap[kind]].set(
    String(firstWeekDay),
    (metric[metricsFieldMap[kind]].get(String(firstWeekDay)) ?? 0) + 1
  );

  if (newUser)
    metric.weeklyUsers.set(
      String(firstWeekDay),
      (metric.weeklyUsers.get(String(firstWeekDay)) ?? 0) + 1
    );

  await metric.save();
};
