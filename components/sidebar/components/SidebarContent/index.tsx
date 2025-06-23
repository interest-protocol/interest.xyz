import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Discord from '@/components/svg/discord';
import Github from '@/components/svg/github';
import SidebarLogo from '@/components/svg/sidebar-logo';
import X from '@/components/svg/x';

import { SIDEBAR_SECTIONS } from '../../sidebar.data';
import MenuSection from './sidebar-section';

const SidebarContent: FC = () => {
  return (
    <Box
      p="1.5rem"
      bg="#121313"
      width={['75%', '80%', '80%', '14.5rem']}
      border="1px solid"
      borderColor="outlineVariant"
      borderRadius="0.75rem"
    >
      <Box mb="m">
        <SidebarLogo maxWidth="40" maxHeight="40" />
      </Box>

      {SIDEBAR_SECTIONS.map((section) => (
        <MenuSection key={section.title} section={section} />
      ))}

      <Box mt="8rem">
        <Typography
          mb="m"
          size="small"
          variant="title"
          color="#FFFFFF"
          fontFamily="Inter"
          fontSize="0.75rem"
          fontWeight="600"
        >
          Social
        </Typography>
        <Box display="flex" gap="10.25px">
          <X
            maxWidth="21.57"
            maxHeight="19.5"
            color="#9CA3AF"
            cursor="pointer"
          />
          <Discord
            maxWidth="21.57"
            maxHeight="19.5"
            color="#9CA3AF"
            cursor="pointer"
          />
          <Github
            maxWidth="21.57"
            maxHeight="19.5"
            color="#9CA3AF"
            cursor="pointer"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarContent;
