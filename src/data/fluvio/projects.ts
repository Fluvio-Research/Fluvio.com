import { getProjects } from './store.ts';

/** Canonical English projection of the content store. */
export const projects = getProjects('en');

export const featuredProjects = projects.filter(({ featured }) => featured);
export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
