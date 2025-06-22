import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import MenuList from '../MenuList';
import { IMenuSectionProps } from './menu-section.types';

const MenuSection: FC<IMenuSectionProps> = ({ section }) => {
  if (section.items.length === 0) return null;

  return (
    <Box mb="xl">
      <Typography
        mb="8px"
        size="small"
        variant="title"
        color="#FFFFFF"
        fontSize="0.75rem"
        fontWeight="600"
        fontFamily="Inter"
      >
        {section.title}
      </Typography>
      <MenuList items={section.items} />
    </Box>
  );
};

export default MenuSection;
