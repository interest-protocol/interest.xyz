import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { pathOr } from 'ramda';

import { CACHE_CONFIG } from '@/constants/cache';
import { dexV2 } from '@/hooks/use-interest-dex-v2';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, {
      methods: ['GET'],
      optionsSuccessStatus: 200,
      origin: process.env.ORIGIN ?? '*',
    });

    const address = pathOr('{}', ['query', 'address'], req);

    const data = await dexV2.getPool(address);

    res
      .status(200)
      .appendHeader('Cache-Control', `public, max-age=${CACHE_CONFIG.POOL}`)
      .json({
        ...data,
        supply: String(data.supply),
        balanceX: String(data.balanceX),
        balanceY: String(data.balanceY),
        metadataX: data.metadataX.toString(),
        metadataY: data.metadataY.toString(),
        bidLiquidity: String(data.bidLiquidity),
        slotBalanceX: String(data.slotBalanceX),
        slotBalanceY: String(data.slotBalanceY),
        poolAddress: data.poolAddress.toString(),
        lastSlotTimestamp: String(data.lastSlotTimestamp),
      });
  } catch (e) {
    res.status(200).send(e);
  }
};

export default handler;
