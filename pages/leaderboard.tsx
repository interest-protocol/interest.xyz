import { NextPage } from 'next';

import { SEO } from '@/components';
import Leaderboard from '@/views/leaderboard';

const LeaderboardPage: NextPage = () => (
  <>
    <SEO pageTitle="Leaderboard" />
    <Leaderboard />
  </>
);

export default LeaderboardPage;
