import { DiscordSVG, GithubSVG, XSVG } from '@/components/svg';

import { ISocialLinkProps } from './sidebar.types';

export const SOCIAL_LINK: ReadonlyArray<ISocialLinkProps> = [
  {
    title: 'X',
    pathname: 'https://x.com/InterestDEX',
    Icon: XSVG,
  },
  {
    title: 'Discord',
    pathname: 'https://discord.com/invite/interestprotocol',
    Icon: DiscordSVG,
  },
  {
    title: 'Github',
    pathname: 'https://github.com/interest-protocol/',
    Icon: GithubSVG,
  },
];
