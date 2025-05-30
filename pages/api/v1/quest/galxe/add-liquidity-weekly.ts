import { NextApiRequest, NextApiResponse } from 'next';

import { findQuestProfile } from '@/server/lib/quest';
import { getFirstWeekDayTimestamp } from '@/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const address = req.query.address as string;

      const profile = await findQuestProfile(address);

      const wasThisWeek =
        getFirstWeekDayTimestamp(profile.lastAddLiquidityAt) ===
        getFirstWeekDayTimestamp();

      const is_ok = wasThisWeek ? 1 : 0;

      res.status(200).json({ is_ok });
      return;
    }
    res.status(404).send(new Error('Route not found'));
  } catch (e) {
    res.status(500).send(e);
  }
};

export default handler;
