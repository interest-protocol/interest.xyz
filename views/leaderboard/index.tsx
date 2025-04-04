import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import Loading from '@/components/loading';
import { ChevronLeftSVG, ChevronRightSVG } from '@/components/svg';
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
          <Box gridColumn="1/-1">
            <ReactPaginate
              breakLabel="..."
              initialPage={page - 1}
              pageRangeDisplayed={2}
              renderOnZeroPageCount={null}
              containerClassName="paginate"
              onPageChange={({ selected }) => setPage(selected + 1)}
              pageCount={
                data && data.totalItems > LIMIT
                  ? Math.ceil(data?.totalItems / LIMIT)
                  : 0
              }
              previousLabel={
                <ChevronLeftSVG
                  width="100%"
                  maxWidth="0.65rem"
                  maxHeight="0.65rem"
                />
              }
              nextLabel={
                <ChevronRightSVG
                  maxWidth="1rem"
                  maxHeight="1rem"
                  width="100%"
                />
              }
            />
          </Box>
          <Box gridColumn="1/-1" />
        </Box>
      )}
    </Layout>
  );
};

export default Leaderboard;
