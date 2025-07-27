import { NextPage } from 'next';

import { SEO } from '@/components';
import Stats from '@/views/stats';

const StatsPage: NextPage = () => {
  return (
    <>
      <SEO pageTitle="Stats" />
      <Stats />
    </>
  );
};

export default StatsPage;
