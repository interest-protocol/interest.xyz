import { ISidebarSection } from './sidebar.types';

export const SIDEBAR_SECTIONS: ReadonlyArray<ISidebarSection> = [
  {
    title: 'Other Products',
    items: [
      { label: 'Memez.gg', href: 'https://memez.gg', isExternal: true },
      {
        label: 'Winter Warlus',
        href: 'https://winterwarlus.com',
        isExternal: true,
      },
      { label: 'Suicoins', href: 'https://suicoins.io', isExternal: true },
      {
        label: 'Sui Terminal',
        href: 'https://sui-terminal.com',
        isExternal: true,
      },
    ],
  },
  {
    title: 'Need Help?',
    items: [
      {
        label: 'Documentation',
        href: 'https://docs.platform.com',
        isExternal: true,
      },
      { label: 'Security Audits', href: '/security-audits', isExternal: true },
      { label: 'Contact Support', href: '/support', isExternal: true },
      {
        label: 'Feedback?',
        href: 'https://feedback.platform.com',
        isExternal: true,
      },
      { label: 'Brand Assets', href: '/brand-assets', isExternal: true },
    ],
  },
];
