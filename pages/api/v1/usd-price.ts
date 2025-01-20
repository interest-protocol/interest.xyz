import { NextApiRequest, NextApiResponse } from 'next';

import { FixedPointMath } from '@/lib';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const type = req.query.type as string;
    const decimals = Number(req.query.decimals as string);

    const data = await fetch(
      `https://testnet.mosaic.ag/porto/v1/quote?srcAsset=${type}&dstAsset=0x1e74c3312b1a7a08eb7cf61310787597ea6609d6d99ce86c0e48399144ea4ce9&amount=${FixedPointMath.toBigNumber(1, decimals).toString()}`,
      {
        headers: {
          'x-api-key': 'tYPtSqDun-w9Yrric2baUAckKtzZh9U0',
        },
      }
    ).then((res) => res.json?.());

    return res.json(data.data?.dstAmount);
  } catch (e) {
    console.log(e);

    res.status(500).send(e);
  }
};

export default handler;
