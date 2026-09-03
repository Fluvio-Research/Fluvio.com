/**
 * Cross-references between projects, expertise areas and people, resolved
 * from the content store in one place so every page agrees on what "related"
 * means. All functions are pure over the locale projections and return
 * records in editor-controlled display order.
 */
import type { Locale } from '~/i18n';

import { getExpertiseAreas, getProjects, getTeamMembers } from './localized.ts';
import type { ExpertiseArea, Project, TeamMember } from './types';

const bySlug = <T extends { slug: string }>(items: T[], slugs: readonly string[] = []): T[] =>
  slugs.map((slug) => items.find((item) => item.slug === slug)).filter((item): item is T => Boolean(item));

/** Expertise areas that list the project among their evidence. */
export const getExpertiseForProject = (locale: Locale, project: Project): ExpertiseArea[] =>
  getExpertiseAreas(locale).filter((area) => area.relatedProjects.includes(project.slug));

/**
 * Projects to continue to from a project page. Explicit `relatedProjects`
 * win; otherwise projects sharing an expertise area fill in, so a new record
 * gets sensible cross-links before an editor curates them.
 */
export const getRelatedProjects = (locale: Locale, project: Project, limit = 3): Project[] => {
  const projects = getProjects(locale);
  const explicit = bySlug(projects, project.relatedProjects).filter((candidate) => candidate.slug !== project.slug);
  if (explicit.length >= limit) return explicit.slice(0, limit);

  const areas = getExpertiseForProject(locale, project);
  const siblings = projects.filter(
    (candidate) =>
      candidate.slug !== project.slug &&
      !explicit.includes(candidate) &&
      areas.some((area) => area.relatedProjects.includes(candidate.slug))
  );
  return [...explicit, ...siblings].slice(0, limit);
};

export const getProjectsForExpertise = (locale: Locale, area: ExpertiseArea): Project[] =>
  bySlug(getProjects(locale), area.relatedProjects);

/** People who practise in an expertise area. */
export const getTeamForExpertise = (locale: Locale, area: ExpertiseArea): TeamMember[] =>
  getTeamMembers(locale).filter((member) => member.expertise?.includes(area.slug));

export const getExpertiseForMember = (locale: Locale, member: TeamMember): ExpertiseArea[] =>
  bySlug(getExpertiseAreas(locale), member.expertise);

/**
 * Projects for a profile page: the ones the person is named on, then the
 * projects of their expertise areas, without duplicates.
 */
export const getProjectsForMember = (locale: Locale, member: TeamMember, limit = 4): Project[] => {
  const projects = getProjects(locale);
  const named = bySlug(projects, member.projects);
  const viaExpertise = getExpertiseForMember(locale, member).flatMap((area) => bySlug(projects, area.relatedProjects));
  const seen = new Set<string>();
  return [...named, ...viaExpertise]
    .filter((project) => (seen.has(project.slug) ? false : seen.add(project.slug)))
    .slice(0, limit);
};

export interface Adjacent<T> {
  previous?: T;
  next?: T;
  index: number;
  total: number;
}

/** Neighbours of a record in display order, wrapping at both ends so the trail never dead-ends. */
export const getAdjacent = <T extends { slug: string }>(items: T[], slug: string): Adjacent<T> => {
  const index = items.findIndex((item) => item.slug === slug);
  const total = items.length;
  if (index < 0 || total < 2) return { index, total };
  return {
    previous: items[(index - 1 + total) % total],
    next: items[(index + 1) % total],
    index,
    total,
  };
};

/** Drop records whose lead image already appears on the page, so a page never shows the same photo twice. */
export const withoutImages = <T>(items: T[], used: readonly string[], image: (item: T) => string): T[] => {
  const normalise = (path: string) => path.replace(/^~\//, '/src/');
  const taken = new Set(used.map(normalise));
  return items.filter((item) => !taken.has(normalise(image(item))));
};

/** Every distinct discipline across the projects, in first-seen order. */
export const getDisciplines = (locale: Locale): string[] => [
  ...new Set(getProjects(locale).flatMap((project) => project.disciplines)),
];

/** Every distinct project location, in display order. */
export const getLocations = (locale: Locale): string[] => [
  ...new Set(getProjects(locale).flatMap((project) => (project.location ? [project.location] : []))),
];
