/**
 * Content store: loads the localized JSON records that the admin interface
 * edits, validates every record against a schema at build time, and exposes
 * typed, locale-projected accessors. A malformed or incomplete record fails
 * the build and the test suite rather than shipping.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { z } from 'astro/zod';

import type { ExpertiseArea, Project, SiteContent, TeamMember } from './types';

export const contentLocales = ['en', 'pijin', 'fr', 'es'] as const;
export type ContentLocale = (typeof contentLocales)[number];

/* The module may execute from a bundled location at build time, so fall back
 * to resolving the content directory from the project root. */
const moduleContentDir = join(dirname(fileURLToPath(import.meta.url)), 'content');
const contentDir = existsSync(moduleContentDir)
  ? moduleContentDir
  : join(process.cwd(), 'src', 'data', 'fluvio', 'content');

/* ------------------------------------------------------------------ */
/* Schemas                                                             */
/* ------------------------------------------------------------------ */

const localImage = z
  .string()
  .regex(/^(?:~|\/src)\/assets\/images\/fluvio\//, 'images must live in src/assets/images/fluvio/');
const localVideo = z
  .string()
  .regex(
    /^(?:~|\/src)\/assets\/images\/fluvio\/.+\.(?:mp4|webm)$/i,
    'videos must live in src/assets/images/fluvio/ and be .mp4 or .webm'
  );
const text = z.string().min(1);
const paragraphs = z.array(text).min(1);

const projectSchema = z.object({
  order: z.number().int().positive(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: text,
  summary: text,
  location: text.optional(),
  timeframe: text.optional(),
  disciplines: z.array(text).min(1),
  partners: z.array(text).optional(),
  heroImage: localImage,
  heroAlt: text,
  gallery: z.array(z.object({ src: localImage, alt: text, caption: text.optional() })).optional(),
  challenge: paragraphs,
  approach: paragraphs,
  outcome: paragraphs,
  featured: z.boolean().optional(),
  relatedProjects: z.array(z.string()).optional(),
});

const teamMemberSchema = z.object({
  order: z.number().int().positive(),
  name: text,
  role: text.optional(),
  bio: text,
  portrait: localImage,
  portraitAlt: text,
  specialties: z.array(text).min(1),
  profileUrl: z.string().url().optional(),
});

const expertiseSchema = z.object({
  order: z.number().int().positive(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: text,
  summary: text,
  description: paragraphs,
  image: localImage,
  imageAlt: text,
  /** Optional demonstration clip; the image stays as poster and fallback. */
  video: localVideo.optional(),
  relatedProjects: z.array(z.string()),
});

const siteSchema = z.object({
  name: text,
  tagline: text,
  summary: text,
  heroImage: localImage,
  heroAlt: text,
  vision: z.object({ title: text, description: text, image: localImage, imageAlt: text }),
  values: z.array(z.object({ title: text, description: text })).length(5),
});

const navigationSchema = z.object({
  vision: text,
  expertise: text,
  projects: text,
  team: text,
  contact: text,
  startProject: text,
  explore: text,
  company: text,
  allRightsReserved: text,
  linkedinLabel: text,
  languageLabel: text,
  linkedinUrl: z.string().url(),
});

export type Navigation = z.infer<typeof navigationSchema>;

const slideSchema = z.object({
  eyebrow: text,
  title: text,
  description: text,
  action: text,
  href: z.string().regex(/^\/[a-z0-9#/-]*$/),
  image: localImage,
  imageAlt: text,
  /** Optional background video; the image stays as poster and fallback. */
  video: localVideo.optional(),
});

const platformSchema = z.object({
  title: text,
  description: text,
  action: text,
  href: z.string().url(),
  image: localImage,
  imageAlt: text,
  /** Where the screenshot links to (e.g. a live deployment); falls back to `href`. */
  imageHref: z.string().url().optional(),
});

const homepageSchema = z.object({
  slides: z.array(slideSchema).min(1).max(8),
  metaDescription: text,
  capabilitiesLabel: text,
  capabilities: z.array(z.object({ title: text, description: text })).length(3),
  expertiseEyebrow: text,
  expertiseTitle: text,
  expertiseIntro: text,
  expertiseMore: text,
  projectsTitle: text,
  projectsIntro: text,
  projectsFeatured: text,
  projectsMore: text,
  platformsTitle: text,
  platformsIntro: text,
  teamTitle: text,
  teamIntro: text,
  teamMore: text,
  impactTitle: text,
  impactBody: z.array(text).min(1),
  platforms: z.object({
    label: text,
    sense: platformSchema,
    cascade: platformSchema,
    reef: platformSchema,
  }),
});

export type Homepage = z.infer<typeof homepageSchema>;

export interface Pages {
  slider: {
    regionLabel: string;
    slideOf: string;
    previous: string;
    next: string;
    pause: string;
    resume: string;
    pauseAria: string;
    resumeAria: string;
    autoplayOff: string;
    autoplayOffAria: string;
    statusTemplate: string;
  };
  visionPage: {
    metaTitle: string;
    eyebrow: string;
    title: string;
    lede: string;
    statementTitle: string;
    valuesTitle: string;
    valuesIntro: string;
    practiceTitle: string;
    practiceBody: string[];
    practiceImageAlt: string;
    contactEyebrow: string;
    contactTitle: string;
    contactIntro: string;
  };
  expertisePage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
    introTitle: string;
    introIntro: string;
    areasLabel: string;
    relatedProjects: string;
    teamTitle: string;
    teamBody: string;
    teamLink: string;
  };
  teamPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
    heroImageAlt: string;
    directoryTitle: string;
    directoryIntro: string;
    contactTitle: string;
    contactIntro: string;
    viewProfile: string;
  };
  contactPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
    heroImageAlt: string;
    enquiryTitle: string;
    enquiryBody: string;
    enquiryAction: string;
    enquirySubject: string;
    enquiryTemplate: string;
    enquiryNote: string;
    socialTitle: string;
    socialBody: string;
    socialAction: string;
  };
  projectsPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lede: string;
    featuredLabel: string;
    listEyebrow: string;
    listTitle: string;
    listIntro: string;
    allProjects: string;
    platformsEyebrow: string;
    platformsTitle: string;
    platformsIntro: string;
  };
  projectDetail: {
    back: string;
    eyebrow: string;
    challenge: string;
    approach: string;
    outcome: string;
    storyLabel: string;
    galleryLabel: string;
    imageLabel: string;
    relatedExpertiseEyebrow: string;
    relatedExpertiseTitle: string;
    relatedProjectsEyebrow: string;
    relatedProjectsTitle: string;
    contactEyebrow: string;
    contactTitle: string;
    contactIntro: string;
  };
  project: {
    viewProject: string;
    readProject: string;
    featuredEyebrow: string;
    location: string;
    timeframe: string;
    disciplines: string;
    partners: string;
  };
  contactPanel: {
    eyebrow: string;
    title: string;
    intro: string;
    action: string;
  };
}

const pagesSchema: z.ZodType<Pages> = z.object({
  slider: z.object({
    regionLabel: text,
    slideOf: text,
    previous: text,
    next: text,
    pause: text,
    resume: text,
    pauseAria: text,
    resumeAria: text,
    autoplayOff: text,
    autoplayOffAria: text,
    statusTemplate: text,
  }),
  visionPage: z.object({
    metaTitle: text,
    eyebrow: text,
    title: text,
    lede: text,
    statementTitle: text,
    valuesTitle: text,
    valuesIntro: text,
    practiceTitle: text,
    practiceBody: paragraphs,
    practiceImageAlt: text,
    contactEyebrow: text,
    contactTitle: text,
    contactIntro: text,
  }),
  expertisePage: z.object({
    metaTitle: text,
    metaDescription: text,
    eyebrow: text,
    title: text,
    lede: text,
    introTitle: text,
    introIntro: text,
    areasLabel: text,
    relatedProjects: text,
    teamTitle: text,
    teamBody: text,
    teamLink: text,
  }),
  teamPage: z.object({
    metaTitle: text,
    metaDescription: text,
    eyebrow: text,
    title: text,
    lede: text,
    heroImageAlt: text,
    directoryTitle: text,
    directoryIntro: text,
    contactTitle: text,
    contactIntro: text,
    viewProfile: text,
  }),
  contactPage: z.object({
    metaTitle: text,
    metaDescription: text,
    eyebrow: text,
    title: text,
    lede: text,
    heroImageAlt: text,
    enquiryTitle: text,
    enquiryBody: text,
    enquiryAction: text,
    enquirySubject: text,
    enquiryTemplate: text,
    enquiryNote: text,
    socialTitle: text,
    socialBody: text,
    socialAction: text,
  }),
  projectsPage: z.object({
    metaTitle: text,
    metaDescription: text,
    eyebrow: text,
    title: text,
    lede: text,
    featuredLabel: text,
    listEyebrow: text,
    listTitle: text,
    listIntro: text,
    allProjects: text,
    platformsEyebrow: text,
    platformsTitle: text,
    platformsIntro: text,
  }),
  projectDetail: z.object({
    back: text,
    eyebrow: text,
    challenge: text,
    approach: text,
    outcome: text,
    storyLabel: text,
    galleryLabel: text,
    imageLabel: text,
    relatedExpertiseEyebrow: text,
    relatedExpertiseTitle: text,
    relatedProjectsEyebrow: text,
    relatedProjectsTitle: text,
    contactEyebrow: text,
    contactTitle: text,
    contactIntro: text,
  }),
  project: z.object({
    viewProject: text,
    readProject: text,
    featuredEyebrow: text,
    location: text,
    timeframe: text,
    disciplines: text,
    partners: text,
  }),
  contactPanel: z.object({
    eyebrow: text,
    title: text,
    intro: text,
    action: text,
  }),
});

const localized = <Schema extends z.ZodTypeAny>(schema: Schema) =>
  z.object({ en: schema, pijin: schema, fr: schema, es: schema });

/* ------------------------------------------------------------------ */
/* Loading                                                             */
/* ------------------------------------------------------------------ */

type Localized<T> = Record<ContentLocale, T>;

function loadRecord<Schema extends z.ZodTypeAny>(path: string, schema: Schema): Localized<z.infer<Schema>> {
  const raw: unknown = JSON.parse(readFileSync(path, 'utf8'));
  const parsed = localized(schema).safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `Invalid content in ${path}:\n${parsed.error.issues.map((issue) => `  ${issue.path.join('.')}: ${issue.message}`).join('\n')}`
    );
  }
  return parsed.data as Localized<z.infer<Schema>>;
}

function loadCollection<Schema extends z.ZodTypeAny>(name: string, schema: Schema): Array<Localized<z.infer<Schema>>> {
  const dir = join(contentDir, name);
  const records = readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => loadRecord(join(dir, file), schema));
  return records.sort((a, b) => (a.en as { order: number }).order - (b.en as { order: number }).order);
}

const projectRecords = loadCollection('projects', projectSchema);
const teamRecords = loadCollection('team', teamMemberSchema);
const expertiseRecords = loadCollection('expertise', expertiseSchema);
const siteRecord = loadRecord(join(contentDir, 'site', 'content.json'), siteSchema);
const navigationRecord = loadRecord(join(contentDir, 'site', 'navigation.json'), navigationSchema);
const homepageRecord = loadRecord(join(contentDir, 'site', 'homepage.json'), homepageSchema);
const pagesRecord = loadRecord(join(contentDir, 'site', 'pages.json'), pagesSchema);

/* ------------------------------------------------------------------ */
/* Locale projections                                                  */
/* ------------------------------------------------------------------ */

/** Project the requested locale over the English record so a partially
 *  translated record degrades to English instead of breaking. */
function project<T extends { order?: number }>(record: Localized<T>, locale: ContentLocale): Omit<T, 'order'> {
  const defined = Object.fromEntries(Object.entries(record[locale] ?? {}).filter(([, value]) => value !== undefined));
  const merged = { ...record.en, ...defined };
  delete merged.order;
  return merged as Omit<T, 'order'>;
}

export const getProjects = (locale: ContentLocale): Project[] =>
  projectRecords.map((record) => project(record, locale));

export const getTeamMembers = (locale: ContentLocale): TeamMember[] =>
  teamRecords.map((record) => project(record, locale));

export const getExpertiseAreas = (locale: ContentLocale): ExpertiseArea[] =>
  expertiseRecords.map((record) => project(record, locale));

export const getSiteContent = (locale: ContentLocale): SiteContent => ({ ...siteRecord.en, ...siteRecord[locale] });

export const getNavigation = (locale: ContentLocale): Navigation => ({
  ...navigationRecord.en,
  ...navigationRecord[locale],
});

export const getHomepage = (locale: ContentLocale): Homepage => ({
  ...homepageRecord.en,
  ...homepageRecord[locale],
});

export const getPages = (locale: ContentLocale): Pages => ({
  ...pagesRecord.en,
  ...pagesRecord[locale],
});
