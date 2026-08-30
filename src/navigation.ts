import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Vision',
      href: getPermalink('/vision'),
    },
    {
      text: 'Expertise',
      href: getPermalink('/expertise'),
    },
    {
      text: 'Projects',
      href: getPermalink('/projects'),
    },
    {
      text: 'Team',
      href: getPermalink('/team'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Start a project', href: getPermalink('/contact') }],
};

export const footerData = {
  links: [
    {
      title: 'Explore',
      links: [
        { text: 'Vision', href: getPermalink('/vision') },
        { text: 'Expertise', href: getPermalink('/expertise') },
        { text: 'Projects', href: getPermalink('/projects') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'Team', href: getPermalink('/team') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: 'Fluvio on LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: 'https://www.linkedin.com/company/fluvioptyltd/',
      target: '_blank',
    },
  ],
  footNote: `© ${new Date().getFullYear()} Fluvio Pty Ltd. All rights reserved.`,
};
