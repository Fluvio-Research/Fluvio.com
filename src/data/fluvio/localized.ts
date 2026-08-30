import type { Locale } from '~/i18n';

import {
  getExpertiseAreas as storeExpertise,
  getProjects as storeProjects,
  getSiteContent as storeSite,
  getTeamMembers as storeTeam,
} from './store.ts';
import type { Project } from './types';

export const getProjects = (locale: Locale): Project[] => storeProjects(locale);
export const getFeaturedProjects = (locale: Locale): Project[] =>
  storeProjects(locale).filter(({ featured }) => featured);
export const getProjectBySlug = (locale: Locale, slug: string): Project | undefined =>
  storeProjects(locale).find((project) => project.slug === slug);
export const getTeamMembers = (locale: Locale) => storeTeam(locale);
export const getExpertiseAreas = (locale: Locale) => storeExpertise(locale);
export const getSiteContent = (locale: Locale) => storeSite(locale);
