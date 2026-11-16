import { getCatalog, getHomepage, getNavigation, getSiteContent, getUi } from '~/data/fluvio/store.ts';
import { localeHref, type Locale } from '~/i18n';

export const getHeaderData = (locale: Locale) => {
  const nav = getNavigation(locale);
  const catalog = getCatalog(locale);
  const platforms = getHomepage(locale).platforms;
  const labels = getUi(locale).header;
  const productsHref = localeHref('/products', locale);
  const systemsHref = localeHref('/systems', locale);

  return {
    links: [
      { text: nav.vision, href: localeHref('/vision', locale) },
      { text: nav.expertise, href: localeHref('/expertise', locale) },
      {
        text: labels.solutions,
        groups: [
          {
            text: catalog.productsLabel,
            href: productsHref,
            links: ['fs-halo', 'fs-spot', 'fs-flux'].map((slug) => ({
              text: catalog.products.find((product) => product.slug === slug)?.name ?? slug,
              href: `${productsHref}#${slug}`,
            })),
          },
          {
            text: catalog.systemsLabel,
            href: systemsHref,
            links: [
              { text: platforms.sense.title, href: localeHref('/systems/fluviosense', locale) },
              { text: platforms.reef.title, href: `${systemsHref}#reef` },
              { text: platforms.cascade.title, href: `${systemsHref}#pulse` },
            ],
          },
        ],
      },
      { text: nav.projects, href: localeHref('/projects', locale) },
      { text: nav.team, href: localeHref('/team', locale) },
    ],
    contact: { text: labels.contact, href: localeHref('/contact', locale) },
  };
};

export const getFooterData = (locale: Locale) => {
  const nav = getNavigation(locale);
  return {
    description: getSiteContent(locale).summary,
    linkedin: { label: nav.linkedinLabel, href: nav.linkedinUrl },
    copyright: `© ${new Date().getFullYear()} Fluvio Pty Ltd. ${nav.allRightsReserved}`,
  };
};
