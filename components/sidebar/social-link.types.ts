import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export type ISocialLinkProps = {
  pathname: string;
  title: string;
  Icon: FC<SVGProps>;
};
