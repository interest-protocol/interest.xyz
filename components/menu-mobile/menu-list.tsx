import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import SideBarMenuListItem from './menu-list-item';
import { MENU_MOBILE_ITEMS } from './menu-mobile.data';

const MobileMenuList: FC = () => (
  <Box display="flex" flexDirection="column" gap="s">
    {MENU_MOBILE_ITEMS.map((item, index) => (
      <SideBarMenuListItem key={v4()} index={index} {...item} />
    ))}
  </Box>
);

export default MobileMenuList;
