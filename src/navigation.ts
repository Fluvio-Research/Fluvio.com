import { localeHref, t, type Locale } from '~/i18n';

export const getHeaderData = (locale: Locale) => {
  const nav = t(locale).nav;
  return {
    links: [
      { text: nav.vision, href: localeHref('/vision', locale) },
      { text: nav.expertise, href: localeHref('/expertise', locale) },
      { text: nav.projects, href: localeHref('/projects', locale) },
      { text: nav.team, href: localeHref('/team', locale) },
      { text: nav.contact, href: localeHref('/contact', locale) },
    ],
    actions: [{ text: nav.startProject, href: localeHref('/contact', locale) }],
  };
};

export const getFooterData = (locale: Locale) => {
  const nav = t(locale).nav;
  return {
    links: [
      {
        title: nav.explore,
        links: [
          { text: nav.vision, href: localeHref('/vision', locale) },
          { text: nav.expertise, href: localeHref('/expertise', locale) },
          { text: nav.projects, href: localeHref('/projects', locale) },
        ],
      },
      {
        title: nav.company,
        links: [
          { text: nav.team, href: localeHref('/team', locale) },
          { text: nav.contact, href: localeHref('/contact', locale) },
        ],
      },
    ],
    secondaryLinks: [],
    socialLinks: [
      {
        ariaLabel: nav.linkedinLabel,
        icon: 'tabler:brand-linkedin',
        href: 'https://www.linkedin.com/company/fluvioptyltd/',
        target: '_blank',
      },
    ],
    footNote: `© ${new Date().getFullYear()} Fluvio Pty Ltd. ${nav.allRightsReserved}`,
  };
};
