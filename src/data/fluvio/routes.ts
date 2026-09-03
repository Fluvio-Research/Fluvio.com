/**
 * Every public route the content store generates, in one place. Pages and
 * components build links through these helpers so a URL scheme change is a
 * one-file edit, and the tests can pin the scheme without reading templates.
 */
import { localeHref, type Locale } from '~/i18n';

/** Project routes stay flat (`/tina`) because they predate this site and are linked externally. */
export const projectPath = (slug: string): string => `/${slug}`;
export const expertisePath = (slug: string): string => `/expertise/${slug}`;
export const teamMemberPath = (slug: string): string => `/team/${slug}`;

export const projectHref = (slug: string, locale: Locale): string => localeHref(projectPath(slug), locale);
export const expertiseHref = (slug: string, locale: Locale): string => localeHref(expertisePath(slug), locale);
export const teamMemberHref = (slug: string, locale: Locale): string => localeHref(teamMemberPath(slug), locale);
