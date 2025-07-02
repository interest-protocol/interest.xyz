import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SidebarList from '../SidebarList';
import { ISidebarSectionProps } from './sidebar-section.types';

const SidebarSection: FC<ISidebarSectionProps> = ({ section }) => {
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
      <SidebarList items={section.items} />
    </Box>
  );
};

export default SidebarSection;
