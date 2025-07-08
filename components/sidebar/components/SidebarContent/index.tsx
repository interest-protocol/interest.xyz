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
      height="100%"
      overflowY="auto"
      border="1px solid"
      borderRadius={isHovered ? '0.75rem 0  0 0.75rem' : '0.75rem'}
      borderColor="outlineVariant"
      width={['90%', '90%', '90%', '14.5rem']}
    >
      <Box mb="m">
        <SidebarLogo maxWidth="40" maxHeight="40" />
      </Box>

      {SIDEBAR_SECTIONS.map((section) => (
        <MenuSection key={section.title} section={section} />
      ))}

      <Box mt={['2rem', '4rem', '6rem', '8rem']}>
        <Typography
          mb="m"
          size="small"
          variant="title"
          color="#FFFFFF"
          fontWeight="600"
          fontFamily="Inter"
          fontSize="0.75rem"
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
