import { Box } from '@interest-protocol/ui-kit';

import { SIDEBAR_ITEMS } from '@/components/layout/sidebar/sidebar.data';

import SwapBottomMenuListItem from './bottom-menu-list-item';

const SwapButtonMenuList = () => {
  return (
    <Box display="flex" bg="">
      {SIDEBAR_ITEMS.map(({ name, path }, index) => (
        <SwapBottomMenuListItem key={index} name={name} path={path} />
      ))}
    </Box>
  );
};

export default SwapButtonMenuList;
