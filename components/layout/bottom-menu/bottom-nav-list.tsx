import { Box } from '@interest-protocol/ui-kit';

import { BOTTOM_MENU_ITEMS } from './bottom-menu.data';
import BottomNavListItem from './bottom-nav-list-item';

const BottomNavList = () => {
  return (
    <Box display="flex" bg="#1d1f24">
      {BOTTOM_MENU_ITEMS.map(({ name, path, Icon, isHidden }, index) => (
        <BottomNavListItem
          key={index}
          Icon={Icon}
          name={name}
          path={path}
          isHidden={isHidden}
        />
      ))}
    </Box>
  );
};

export default BottomNavList;
