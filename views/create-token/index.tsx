import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import CreateTokenForm from './create-token-form';

const CreateToken: FC = () => (
  <Layout>
    <Box width="100%" display="flex" alignItems="center" flexDirection="column">
      <Box
        display="flex"
        minWidth="45.3rem"
        height="37.59375rem"
        flexDirection="column"
      >
        <Typography
          size="large"
          variant="title"
          color="#FFFFFF"
          fontWeight="600"
          fontSize="1.75rem"
          fontFamily="Inter"
          mb="1.5rem"
        >
          Create Token
        </Typography>
        <CreateTokenForm />
      </Box>
    </Box>
  </Layout>
);

export default CreateToken;
