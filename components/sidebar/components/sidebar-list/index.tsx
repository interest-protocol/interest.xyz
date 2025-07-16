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
          key={label}
          mb="0.75rem"
          borderRadius="s"
          cursor="pointer"
          nHover={{ bg: 'surfaceContainerHighest' }}
        >
          {isExternal ? (
            <Link href={href} rel="noreferrer" target="_blank">
              <Box
                gap="0.5rem"
                display="flex"
                color="#9CA3AF"
                alignItems="center"
                transition="0.3s"
                textDecoration="none"
                nHover={{ color: '#B4C5FF' }}
              >
                <Typography
                  size="medium"
                  variant="body"
                  fontWeight="600"
                  fontSize="0.75rem"
                  fontFamily="Inter"
                  lineHeight="1.5rem"
                >
                  {label}
                </Typography>
                <ExternalLink maxWidth="1rem" maxHeight="1rem" width="100%" />
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
                  lineHeight="1.5rem"
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
