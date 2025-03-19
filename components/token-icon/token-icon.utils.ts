import { DefaultTokenIcon, TokenIconUrl } from './token-icon.types';

export const isTokenIconUrl = (icon: DefaultTokenIcon): icon is TokenIconUrl =>
  !!(icon as TokenIconUrl).url;
