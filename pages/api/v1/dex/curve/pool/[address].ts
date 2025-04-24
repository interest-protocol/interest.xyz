import {
  StablePool,
  VolatilePool,
} from '@interest-protocol/interest-aptos-curve';
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr, toPairs } from 'ramda';

import { CACHE_CONFIG } from '@/constants/cache';
import { curveDex } from '@/hooks/use-interest-dex-curve';

const isStable = (data: StablePool | VolatilePool): data is StablePool =>
  !!(data as StablePool).initialA;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['GET'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    const address = pathOr('{}', ['query', 'address'], req);

    const data = await curveDex.getPool(address);

    const parsedData = {
      ...data,
      isStable: isStable(data.data),
      adminFungibleStore: {
        ...data.adminFungibleStore,
        balance: String(data.adminFungibleStore.balance),
      },
      supply: {
        value: String(data.supply.value),
        maxValue: String(data.supply.maxValue),
      },
      data: {
        ...(isStable(data.data)
          ? {
              ...data.data,
              initialA: String(data.data.initialA),
              futureA: String(data.data.futureA),
              initialATime: String(data.data.initialATime),
              futureATime: String(data.data.futureATime),
              adminFee: String(data.data.adminFee),
              futureFee: String(data.data.futureFee),
              futureAdminFee: String(data.data.futureAdminFee),
              fee: String(data.data.fee),
            }
          : {
              virtualPrice: String(data.data.virtualPrice),
              xcpProfit: String(data.data.xcpProfit),
              xcpProfitA: String(data.data.xcpProfitA),
              lastPricesTimestamp: String(data.data.lastPricesTimestamp),
              maxA: String(data.data.maxA),
              minA: String(data.data.minA),
              d: String(data.data.d),
              a: String(data.data.a),
              gamma: String(data.data.gamma),
              rebalancingParams: {
                extraProfit: String(data.data.rebalancingParams.extraProfit),
                adjustmentStep: String(
                  data.data.rebalancingParams.adjustmentStep
                ),
                maHalfTime: String(data.data.rebalancingParams.maHalfTime),
              },
              futureRebalancingParams: {
                extraProfit: String(
                  data.data.futureRebalancingParams.extraProfit
                ),
                adjustmentStep: String(
                  data.data.futureRebalancingParams.adjustmentStep
                ),
                maHalfTime: String(
                  data.data.futureRebalancingParams.maHalfTime
                ),
              },
              fees: {
                adminFee: String(data.data.fees.adminFee),
                gammaFee: String(data.data.fees.gammaFee),
                midFee: String(data.data.fees.midFee),
                outFee: String(data.data.fees.outFee),
              },
              futureFees: {
                adminFee: String(data.data.futureFees.adminFee),
                gammaFee: String(data.data.futureFees.gammaFee),
                midFee: String(data.data.futureFees.midFee),
                outFee: String(data.data.futureFees.outFee),
              },
              prices: toPairs(data.data.prices).reduce(
                (acc, [key, value]) => ({
                  ...acc,
                  [key]: String(value),
                }),
                {}
              ),
            }),
        balances: data.data.balances.map((balance) => String(balance)),
      },
    };

    res
      .status(200)
      .appendHeader('Cache-Control', `public, max-age=${CACHE_CONFIG.POOL}`)
      .json(parsedData);
  } catch (e) {
    console.warn(e);
    console.warn('>> Error in curve pool API');

    res.status(500).send(e);
  }
};

export default handler;
