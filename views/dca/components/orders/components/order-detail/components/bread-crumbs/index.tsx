import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import ArrowRight from '@/components/svg/arrow-right';

import { BreadcrumbsProps } from './bread-crumbs.types';

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => (
  <Box mb="1rem" gap="0.5rem" display="flex" alignItems="center">
    {breadcrumbs.map((item, index) => (
      <Box key={item.href} gap="0.5rem" display="flex" alignItems="center">
        <Link href={item.href}>
          <Typography
            size="medium"
            color="#9CA3AF"
            variant="label"
            fontWeight="500"
            fontFamily="Inter"
            fontSize="0.875rem"
          >
            {item.label}
          </Typography>
        </Link>
        {index < breadcrumbs.length - 1 && (
          <ArrowRight
            width="100%"
            color="#9CA3AF"
            maxWidth="1.25rem"
            maxHeight="1.25rem"
          />
        )}
      </Box>
    ))}
  </Box>
);

export default Breadcrumbs;
