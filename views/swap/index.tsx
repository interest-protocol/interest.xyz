import { FC } from 'react';

import Layout from '@/components/layout';

import SwapBackground from './components/swap-background';
import SwapContent from './swap-content';

const Swap: FC = () => {
  return (
    <Layout background={<SwapBackground />}>
      <SwapContent />
    </Layout>
  );
};

export default Swap;
