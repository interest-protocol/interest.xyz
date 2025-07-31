import { NextPage } from 'next';

import { SEO } from '@/components';
import ErrorPage from '@/views/create-token/error';

const NotFoundPage: NextPage = () => (
  <>
    <SEO pageTitle="Not Found" />
    <ErrorPage message="Page not found" />
  </>
);

export default NotFoundPage;
