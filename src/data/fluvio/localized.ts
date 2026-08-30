import type { Locale } from '~/i18n';

import { expertiseAreas } from './expertise';
import { projects } from './projects';
import { siteContent } from './site';
import { teamMembers } from './team';
import * as esOverlay from './translations/es';
import * as frOverlay from './translations/fr';
import type { ExpertiseArea, Project, SiteContent, TeamMember } from './types';

const overlays = { fr: frOverlay, es: esOverlay } as const;

const merge = <T extends object>(base: T, override?: Partial<T>): T => ({ ...base, ...override });

/** Projects with locale overlays applied; slugs, images and routing stay canonical. */
export const getProjects = (locale: Locale): Project[] => {
  if (locale === 'en') return projects;
  const overlay = overlays[locale].projects;
  return projects.map((project) => merge(project, overlay[project.slug]));
};

export const getFeaturedProjects = (locale: Locale): Project[] =>
  getProjects(locale).filter(({ featured }) => featured);

export const getProjectBySlug = (locale: Locale, slug: string): Project | undefined =>
  getProjects(locale).find((project) => project.slug === slug);

/** Team profiles with locale overlays applied; names and portraits stay canonical. */
export const getTeamMembers = (locale: Locale): TeamMember[] => {
  if (locale === 'en') return teamMembers;
  const overlay = overlays[locale].team;
  return teamMembers.map((member) => merge(member, overlay[member.name]));
};

/** Expertise areas with locale overlays applied; slugs and images stay canonical. */
export const getExpertiseAreas = (locale: Locale): ExpertiseArea[] => {
  if (locale === 'en') return expertiseAreas;
  const overlay = overlays[locale].expertise;
  return expertiseAreas.map((area) => merge(area, overlay[area.slug]));
};

/** Site content with locale overlays applied. */
export const getSiteContent = (locale: Locale): SiteContent => {
  if (locale === 'en') return siteContent;
  const overlay = overlays[locale].site;
  return {
    ...siteContent,
    ...overlay,
    vision: { ...siteContent.vision, ...overlay.vision },
    values: overlay.values ?? siteContent.values,
  };
};
