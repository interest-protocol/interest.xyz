import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr } from 'ramda';

import { CACHE_CONFIG } from '@/constants/cache';
import { curveDex } from '@/hooks/use-interest-dex-curve';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['GET'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    const addressesParam = pathOr('', ['query', 'addresses'], req);

    const addresses = addressesParam.split(',');

    const data = await curveDex.getFarms(addresses);

    const parsedData = data.map(
      ({
        rewards,
        stakedBalance,
        startTimestamp,
        stakedFa: { address, ...stakeFa },
        ...item
      }) => ({
        ...item,
        stakedBalance: String(stakedBalance),
        startTimestamp: String(startTimestamp),
        stakeFa: { ...stakeFa, address: address.toString() },
        rewards: rewards.map(
          ({
            balance,
            rewardsPerSecond,
            rewardFa: { address, ...rewardFa },
          }) => ({
            balance: String(balance),
            rewardsPerSecond: String(rewardsPerSecond),
            rewardFa: { ...rewardFa, address: address.toString() },
          })
        ),
      })
    );

    res
      .status(200)
      .appendHeader('Cache-Control', `public, max-age=${CACHE_CONFIG.FARM}`)
      .json(parsedData);
  } catch (e) {
    console.warn(e);
    console.warn('>> Error in curve farm API');

    res.status(500).send(e);
  }
};

export default handler;
