import { getPages, type Pages } from '~/data/fluvio/store.ts';
import { getPermalink } from '~/utils/permalinks';

export const locales = ['en', 'pijin', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Every locale that lives under a path prefix (all but the default). */
export const secondaryLocales = locales.filter((locale): locale is Exclude<Locale, 'en'> => locale !== defaultLocale);

/**
 * `getStaticPaths` entries for the `[lang]` routes. Adding a language is a
 * change to `locales` above; no route file needs editing.
 */
export const localeStaticPaths = (): Array<{ params: { lang: Locale } }> =>
  secondaryLocales.map((lang) => ({ params: { lang } }));

/**
 * The same, fanned out over the records of each locale: one path per record
 * per locale, with the localised record passed through as a prop.
 */
export const localeRecordStaticPaths = <T>(
  records: (locale: Locale) => readonly T[],
  params: (record: T) => Record<string, string>
): Array<{ params: { lang: Locale } & Record<string, string>; props: { record: T } }> =>
  secondaryLocales.flatMap((lang) =>
    records(lang).map((record) => ({ params: { lang, ...params(record) }, props: { record } }))
  );

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pijin: 'Pijin',
  fr: 'Français',
  es: 'Español',
};

/** BCP-47 language tags for the html lang attribute; Solomon Islands Pijin
 *  keeps the readable "pijin" slug in URLs but its registered code is "pis". */
export const langTags: Record<Locale, string> = {
  en: 'en',
  pijin: 'pis',
  fr: 'fr',
  es: 'es',
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
