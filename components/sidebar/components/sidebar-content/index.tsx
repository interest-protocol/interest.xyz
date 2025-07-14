import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import SidebarLogo from '@/components/svg/sidebar-logo';

import { SIDEBAR_SECTIONS } from '../../sidebar.data';
import { SOCIAL_LINK } from '../../social-link.data';
import { ISidebarContentProps } from './sidebar-content.types';
import MenuSection from './sidebar-section';

const SidebarContent: FC<ISidebarContentProps> = ({ isHovered }) => {
  return (
    <Box
      p="1.5rem"
      bg="#121313"
      display="flex"
      overflowY="auto"
      border="1px solid"
      onClick={(e) => e.stopPropagation()}
      flexDirection="column"
      borderColor="outlineVariant"
      justifyContent="space-between"
      width={['90%', '90%', '90%', '14.5rem']}
      borderRadius={isHovered ? '0.75rem 0  0 0.75rem' : '0.75rem'}
    >
      <Box>
        <Box mb="m">
          <SidebarLogo maxWidth="40" maxHeight="40" />
        </Box>

        {SIDEBAR_SECTIONS.map((section) => (
          <MenuSection key={section.title} section={section} />
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
    </Box>
  );
};

export default SidebarContent;
