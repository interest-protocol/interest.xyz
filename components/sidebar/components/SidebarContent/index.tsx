import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import SidebarLogo from '@/components/svg/sidebar-logo';

import { SIDEBAR_SECTIONS } from '../../sidebar.data';
import { SOCIAL_LINK } from '../../social-link.data';
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
          {SOCIAL_LINK.map(({ title, pathname, Icon }) => (
            <Link
              key={v4()}
              href={pathname}
              target="_blank"
              rel="noreferrer"
              title={`Follow us on ${title}`}
            >
              <Box width="1.348125rem" height="1.21875rem">
                <Icon
                  maxWidth="21.57"
                  maxHeight="19.5"
                  color="#9CA3AF"
                  cursor="pointer"
                />
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarContent;
