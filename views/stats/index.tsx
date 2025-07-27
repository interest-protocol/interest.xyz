import { FC } from 'react';

import Layout from '@/components/layout';

import StatsContent from './stats-content';

const Stats: FC = () => {
  return (
    <Layout useContainer={false} ml={['0rem', '2.5rem']}>
      <StatsContent />
    </Layout>
  );
};

export default Stats;
