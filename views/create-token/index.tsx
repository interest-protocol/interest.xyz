import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import CreateTokenForm from './create-token-form';

const CreateToken: FC = () => (
  <Layout>
    <Box width="100%" display="flex" alignItems="center" flexDirection="column">
      <Box
        display="flex"
        width="100%"
        maxWidth="45.3rem"
        flexDirection="column"
      >
        <Typography
          mb="1.5rem"
          size="large"
          variant="title"
          color="#FFFFFF"
          fontWeight="600"
          fontFamily="Inter"
          fontSize={['1.125rem', '1.75rem']}
        >
          Create Token
        </Typography>
        <CreateTokenForm />
      </Box>
    </Box>
  </Layout>
);

export default CreateToken;
