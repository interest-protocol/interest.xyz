import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import SidebarLogo from '@/components/svg/sidebar-logo';

import { SIDEBAR_SECTIONS } from '../../sidebar.data';
import { SOCIAL_LINK } from '../../social-link.data';
import SidebarSection from './sidebar-section';

const SidebarContent: FC = () => (
  <>
    <Box>
      <Box mb="m">
        <SidebarLogo maxWidth="40" maxHeight="40" />
      </Box>

      {SIDEBAR_SECTIONS.map((section) => (
        <SidebarSection key={section.title} section={section} />
      ))}
    </Box>
    <Box mb={['0.5rem', '0.5rem', '0.5rem', '7.25rem']}>
      <Typography
        mb="m"
        size="small"
        variant="title"
        color="#FFFFFF"
        fontWeight="600"
        fontFamily="Inter"
        fontSize="0.75rem"
        lineHeight="1.5rem"
      >
        Social
      </Typography>

      <Box display="flex" gap="1.5rem">
        {SOCIAL_LINK.map(({ title, pathname, Icon }) => (
          <Link
            key={v4()}
            href={pathname}
            target="_blank"
            rel="noreferrer"
            title={`Follow us on ${title}`}
          >
            <Box
              width="1.5rem"
              height="1.5rem"
              color="#9CA3AF"
              transition="0.3s"
              nHover={{ color: '#B4C5FF' }}
            >
              <Icon
                width="100%"
                maxWidth="100%"
                cursor="pointer"
                maxHeight="100%%"
              />
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  </>
);

export default SidebarContent;
