import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SidebarList from '../sidebar-list';
import { ISidebarSectionProps } from './sidebar-section.types';

const SidebarSection: FC<ISidebarSectionProps> = ({ section }) => {
  if (section.items.length === 0) return null;

  return (
    <Box mb="1.75rem">
      <Typography
        mb="8px"
        color="#FFF"
        size="small"
        variant="title"
        fontWeight="600"
        fontFamily="Inter"
        fontSize="0.75rem"
        lineHeight="1.5rem"
      >
        {section.title}
      </Typography>
      <SidebarList items={section.items} />
    </Box>
  );
};

export default SidebarSection;
