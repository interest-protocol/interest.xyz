import { ReactNode } from 'react';

export interface LayoutProps {
  title?: string;
  background?: ReactNode;
  useContainer?: boolean;
  ml?: string | string[];
}
