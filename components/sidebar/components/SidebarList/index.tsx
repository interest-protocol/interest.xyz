import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import ExternalLink from '@/components/svg/external-link';

import { ISidebarListProps } from './sidebar-list.types';

const SidebarList: FC<ISidebarListProps> = ({ items }) => {
  const normalizeItems = items.map((item) =>
    typeof item === 'string'
      ? { label: item, href: '#', isExternal: false }
      : item
  );

  return (
    <Box as="ul" p="0" m="0" listStyle="none">
      {normalizeItems.map(({ label, href, isExternal }) => (
        <Box
          as="li"
          mb="xs"
          key={label}
          borderRadius="s"
          cursor="pointer"
          nHover={{ bg: 'surfaceContainerHighest' }}
        >
          {isExternal ? (
            <Link href={href} rel="noreferrer" target="_blank">
              <Box
                gap="4px"
                display="flex"
                alignItems="center"
                textDecoration="none"
              >
                <Typography
                  size="medium"
                  variant="body"
                  color="#9CA3AF"
                  fontWeight="600"
                  fontSize="0.75rem"
                  fontFamily="Inter"
                  nHover={{ color: '#B4C5FF' }}
                >
                  {label}
                </Typography>
                <ExternalLink maxWidth="16" maxHeight="16" />
              </Box>
            </Link>
          ) : (
            <Link href={href}>
              <Box display="flex" alignItems="center" textDecoration="none">
                <Typography
                  variant="body"
                  size="medium"
                  color="#9CA3AF"
                  fontWeight="600"
                  fontSize="0.75rem"
                  fontFamily="Inter"
                  nHover={{ color: '#B4C5FF' }}
                >
                  {label}
                </Typography>
              </Box>
            </Link>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SidebarList;
