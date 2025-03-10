import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { IPXSVG } from '@/components/svg';

import { SOCIAL_LINK } from './ social-link.data';

const Footer: FC = () => {
  return (
    <Box
      gap="s"
      as="footer"
      width="100%"
      alignItems="center"
      px={['s', 's', 's', '2xl']}
      pb={['m', 'm', 'm', '2xl']}
      mb={['6rem', '6rem', '6rem', 'unset']}
      justifyContent="space-between"
      pt={['2xl', '2xl', '2xl', 'l']}
      display={['flex', 'flex', 'flex', 'grid']}
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr auto']}
    >
      <Box display="flex" alignItems="center" gap="m">
        <Link
          target="_blank"
          rel="noreferrer"
          title="Visit our landing page"
          href="https://www.interestprotocol.com/"
        >
          <Box
            width="1.7rem"
            height="1.7rem"
            color="onSurface"
            position="relative"
            nHover={{ color: 'primary' }}
          >
            <IPXSVG maxHeight="100%" maxWidth="100%" width="100%" />
          </Box>
        </Link>
        <Typography
          size="medium"
          variant="label"
          color="onSurface"
          textTransform="capitalize"
          display={['none', 'none', 'none', 'block']}
        >
          &copy; Interest PROTOCOL {new Date().getFullYear()}
        </Typography>
      </Box>
      <Box
        gap="xs"
        display="flex"
        position="relative"
        flexDirection="column-reverse"
      >
        <Box
          gap="xs"
          display="flex"
          justifySelf="end"
          alignItems="center"
          justifyContent="center"
        >
          <Typography color="onSurface" variant="label" size="medium">
            Follow us
          </Typography>
          <Box display="flex" gap="xs">
            {SOCIAL_LINK.map(({ title, pathname, Icon }) => (
              <Link
                key={v4()}
                href={pathname}
                target="_blank"
                rel="noreferrer"
                title={`Follow us on ${title}`}
              >
                <Box
                  p="2xs"
                  width="2rem"
                  height="2rem"
                  color="onSurface"
                  border="1px solid"
                  borderRadius="full"
                  display="flex"
                  borderColor="outlineVariant"
                  nHover={{ borderColor: 'outline' }}
                >
                  <Icon maxHeight="1.5rem" maxWidth="1.5rem" width="1.5rem" />
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
