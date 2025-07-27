import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import NoCoin from '@/components/wallet/profile/menu-profile/tabs/no-coin';

import { mockData } from '../../recent-dca.data';
import RowTableRecentDCA from '../row-table-recent-dca';

const TableRecentDCA: FC = () => {
  const hasData = mockData.length > 0;

  return (
    <Box
      bg="#030712"
      width="100%"
      borderRadius="0.5rem"
      border="1px solid #1F2937"
    >
      {hasData ? (
        mockData.map((item) => <RowTableRecentDCA key={v4()} {...item} />)
      ) : (
        <Box
          width="100%"
          height="20rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <NoCoin />
        </Box>
      )}
    </Box>
  );
};

export default TableRecentDCA;
