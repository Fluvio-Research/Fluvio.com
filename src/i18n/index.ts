import { getPages, type Pages } from '~/data/fluvio/store.ts';
import { getPermalink } from '~/utils/permalinks';

export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
};

/** The full page-string catalog for a locale, served from the content store. */
export const t = (locale: Locale): Pages => getPages(locale);

/** Locale variants other than the default get a path prefix. */
export const localizePath = (path: string, locale: Locale): string =>
  locale === defaultLocale ? path : `/${locale}${path === '/' ? '' : path}`;

/** A base-aware, locale-aware permalink for internal links. */
export const localeHref = (path: string, locale: Locale): string => {
  const [pathname, hash] = path.split('#');
  return getPermalink(localizePath(pathname, locale)) + (hash ? `#${hash}` : '');
};

/** Strip base and locale prefix from a pathname, for locale switching. */
export const unlocalizedPathname = (pathname: string, base: string): string => {
  let path = pathname;
  const trimmedBase = base.replace(/\/+$/, '');
  if (trimmedBase && path.startsWith(trimmedBase)) path = path.slice(trimmedBase.length);
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
      path = path.slice(locale.length + 1);
      break;
    }
  }
  return path || '/';
};
