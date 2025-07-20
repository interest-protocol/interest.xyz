import { FC } from 'react';

import Layout from '@/components/layout';

import DCAContent from './dca-content';

const DCA: FC = () => (
  <Layout title="DCA" useContainer={false} ml={['0rem', '2.5rem']}>
    <DCAContent />
  </Layout>
);

export default DCA;
