import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import Loading from '@/components/loading';
import { formatDollars } from '@/utils';

import { LIMIT } from './leaderboard.data';
import { useLeaderboard } from './leaderboard.hooks';

const Leaderboard: FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useLeaderboard(page);

  return (
    <Layout title="Leaderboard">
      {isLoading ? (
        <Box
          py="4rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Loading />
        </Box>
      ) : (
        <Box
          p="m"
          gap="m"
          display="grid"
          borderRadius="m"
          overflowY="auto"
          color="onSurface"
          bg="highContainer"
          justifyItems="center"
          gridTemplateColumns="1fr 4fr 2fr 3fr 3fr"
        >
          <Box gridColumn="1/-1" />
          <Typography variant="label" size="large">
            N
          </Typography>
          <Typography variant="label" size="large">
            User Address
          </Typography>
          <Typography variant="label" size="large">
            Trades
          </Typography>
          <Typography variant="label" size="large">
            Amount per trade ($)
          </Typography>
          <Typography variant="label" size="large">
            Total Volume ($)
          </Typography>
          <Box as="hr" width="100%" gridColumn="1/-1" opacity="0.1" />
          {data?.data?.flatMap(({ sender, swaps, volume }, index) => [
            <Box key={v4()}>{index + 1 + LIMIT * (page - 1)}</Box>,
            <Box key={v4()}>
              {sender.slice(0, 7)}...
              {sender.slice(-10, -1)}
            </Box>,
            <Box key={v4()}>{swaps}</Box>,
            <Box key={v4()}>{formatDollars(volume / swaps)}</Box>,
            <Box key={v4()}>{formatDollars(volume)}</Box>,
          ])}
          <Box gridColumn="1/-1" />
          <Box gridColumn="1/-1">
            <ResponsivePagination
              current={page ?? 0}
              onPageChange={setPage}
              total={Math.ceil((data?.totalItems ?? 0) / LIMIT)}
            />
          </Box>
          <Box gridColumn="1/-1" />
        </Box>
      )}
    </Layout>
  );
};

export default Leaderboard;
