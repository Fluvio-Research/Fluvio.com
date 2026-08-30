import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { relative } from 'node:path';
import test from 'node:test';

import { expertiseAreas } from '../src/data/fluvio/expertise.ts';
import {
  contentLocales,
  getExpertiseAreas,
  getHomepage,
  getNavigation,
  getProjects,
  getSiteContent,
  getTeamMembers,
} from '../src/data/fluvio/store.ts';
import { en } from '../src/i18n/en.ts';
import { fr } from '../src/i18n/fr.ts';
import { es } from '../src/i18n/es.ts';
import { featuredProjects, getProjectBySlug, projects } from '../src/data/fluvio/projects.ts';
import { siteContent } from '../src/data/fluvio/site.ts';
import { teamMembers } from '../src/data/fluvio/team.ts';

const expectedSlugs = [
  'advance-queensland',
  'bina',
  'monitoring-honiara',
  'ghg-emissions-reservoirs',
  'wrd',
  'tina',
  'sol-trader-oil-spill',
  'cordap',
  'reservoir-sedimentation',
];

const expectedTeamNames = [
  'Simon Albert',
  'Alistair Grinham',
  'Nick Hutley',
  'Melanie Johnson',
  'Louis Ray',
  'Mandus Boselalu',
  'Mubashir Imran',
  'Yuval Kark-Levin',
  'Eric Cheung',
];

const expectedExpertiseTitles = [
  'Innovative hydrological monitoring',
  'Island-scale and catchment modelling',
  'Catchment and water resource management',
  'Blue carbon and greenhouse gas assessment',
  'Operational monitoring systems',
  'Sediment transport and reservoir assessment',
];

const config = await readFile(new URL('../src/config.yaml', import.meta.url), 'utf8');
const navigation = await readFile(new URL('../src/navigation.ts', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const homepageFrontmatter = homepage.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
const repositoryRoot = new URL('../', import.meta.url);
const excludedDirectories = new Set(['.git', '.superpowers', 'dist', 'docs', 'node_modules']);

async function collectPublicSourceFiles(directory = repositoryRoot) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryUrl = new URL(entry.isDirectory() ? `${entry.name}/` : entry.name, directory);

    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) files.push(...(await collectPublicSourceFiles(entryUrl)));
      continue;
    }

    const path = relative(repositoryRoot.pathname, entryUrl.pathname);
    if (path.startsWith('src/pages/') || path === 'src/navigation.ts' || path === 'src/config.yaml')
      files.push(entryUrl);
  }

  return files;
}

const publicSourceFiles = await collectPublicSourceFiles();

const projectExperienceFiles = [
  'src/components/fluvio/LargeImage.astro',
  'src/components/fluvio/ExpertiseList.astro',
  'src/components/fluvio/ProjectFeature.astro',
  'src/components/fluvio/ProjectListItem.astro',
  'src/components/fluvio/ProjectMeta.astro',
  'src/components/fluvio/TeamProfile.astro',
  'src/components/fluvio/PlatformFeature.astro',
  'src/components/fluvio/ContactPanel.astro',
  'src/pages/projects.astro',
  'src/pages/[slug].astro',
];

const primaryPageFiles = [
  'src/pages/index.astro',
  'src/pages/vision.astro',
  'src/pages/expertise.astro',
  'src/pages/projects.astro',
  'src/pages/team.astro',
  'src/pages/contact.astro',
];

test('Fluvio content has complete project, expertise and team records', () => {
  assert.deepEqual(projects.map(({ slug }) => slug).sort(), expectedSlugs.sort());
  assert.equal(new Set(projects.map(({ slug }) => slug)).size, 9);
  assert.equal(expertiseAreas.length, 6);
  assert.equal(teamMembers.length, 9);
  for (const item of [...projects, ...expertiseAreas, ...teamMembers]) {
    assert.ok(item.title || item.name);
    assert.ok(item.summary || item.bio);
    assert.match(item.heroImage || item.image || item.portrait, /^(?:~|\/src)\/assets\/images\/fluvio\//);
  }
});

test('Fluvio team and expertise records use the specified names and labels', () => {
  assert.deepEqual(
    teamMembers.map(({ name }) => name),
    expectedTeamNames
  );
  assert.deepEqual(
    expertiseAreas.map(({ title }) => title),
    expectedExpertiseTitles
  );
});

test('Fluvio site content provides the homepage and vision contract', () => {
  assert.equal(siteContent.name, 'Fluvio');
  assert.equal(siteContent.tagline, 'Innovative Solutions for Tomorrow');
  assert.ok(siteContent.summary);
  assert.match(siteContent.heroImage, /^(?:~|\/src)\/assets\/images\/fluvio\//);
  assert.equal(siteContent.vision.title, 'Vision');
  assert.ok(siteContent.vision.description);
  assert.match(siteContent.vision.image, /^(?:~|\/src)\/assets\/images\/fluvio\//);
  assert.equal(siteContent.values.length, 5);
  for (const value of siteContent.values) {
    assert.ok(value.title);
    assert.ok(value.description);
  }
});

test('Fluvio project selectors return featured and matching projects', () => {
  assert.deepEqual(featuredProjects.map(({ slug }) => slug).sort(), [
    'advance-queensland',
    'monitoring-honiara',
    'tina',
  ]);
  assert.equal(getProjectBySlug('tina')?.title, 'Hydrological monitoring of Tina Hydro');
  assert.equal(getProjectBySlug('missing-project'), undefined);
});

test('Fluvio shell uses the brand name and primary navigation', () => {
  assert.match(config, /name:\s*Fluvio/);
  assert.doesNotMatch(config + navigation, /Get template|SaaS|Pricing|AstroWind/);
  assert.doesNotMatch(homepageFrontmatter, /AstroWind|Free template/);
  assert.match(config, /width:\s*1200\s+height:\s*626/);
  for (const label of ['Vision', 'Expertise', 'Projects', 'Team', 'Contact']) {
    assert.ok(Object.values(getNavigation('en')).includes(label));
  }
});

test('Fluvio catalogs translate every string for every locale', () => {
  const keyPaths = (value, prefix = '') =>
    Object.entries(value).flatMap(([key, child]) =>
      child && typeof child === 'object' ? keyPaths(child, `${prefix}${key}.`) : [`${prefix}${key}`]
    );

  const reference = keyPaths(en).sort();
  for (const catalog of [fr, es]) {
    assert.deepEqual(keyPaths(catalog).sort(), reference);
  }
  assert.equal(getHomepage('en').slides.length, 5);

  // Importing the store already schema-validates every record in every locale;
  // here we pin structural parity across locales.
  for (const locale of contentLocales) {
    assert.deepEqual(
      getProjects(locale).map(({ slug }) => slug),
      getProjects('en').map(({ slug }) => slug)
    );
    assert.deepEqual(
      getTeamMembers(locale).map(({ name }) => name),
      expectedTeamNames
    );
    assert.equal(getExpertiseAreas(locale).length, 6);
    assert.equal(getSiteContent(locale).values.length, 5);
    for (const key of ['vision', 'expertise', 'projects', 'team', 'contact', 'startProject', 'linkedinUrl']) {
      assert.ok(getNavigation(locale)[key]);
    }
  }
  // Translated locales actually differ from English where language differs.
  assert.notEqual(getProjects('fr')[0].title, getProjects('en')[0].title);
  assert.notEqual(getTeamMembers('es')[0].role, getTeamMembers('en')[0].role);
});

test('Fluvio locale routes exist for French and Spanish', async () => {
  const localePages = ['index', 'vision', 'expertise', 'projects', 'team', 'contact', '[slug]'];
  await Promise.all(localePages.map((page) => access(new URL(`../src/pages/[lang]/${page}.astro`, import.meta.url))));

  const langIndex = await readFile(new URL('../src/pages/[lang]/index.astro', import.meta.url), 'utf8');
  assert.match(langIndex, /params: \{ lang: 'fr' \}/);
  assert.match(langIndex, /params: \{ lang: 'es' \}/);
});

test('Fluvio public sources contain no demonstration copy or routes', async () => {
  for (const source of publicSourceFiles) {
    const text = await readFile(source, 'utf8');
    assert.doesNotMatch(text, /Get template|AstroWind|SaaS|Pricing|Unsplash/i);
  }

  assert.doesNotMatch(config, /isEnabled:\s*true/);
  assert.doesNotMatch(navigation, /blog|rss/i);
});

test('Fluvio project experience provides shared components and static project routes', async () => {
  await Promise.all(projectExperienceFiles.map((path) => access(new URL(`../${path}`, import.meta.url))));

  const projectRoute = await readFile(new URL('../src/pages/[slug].astro', import.meta.url), 'utf8');
  const largeImage = await readFile(new URL('../src/components/fluvio/LargeImage.astro', import.meta.url), 'utf8');
  const projectFeature = await readFile(
    new URL('../src/components/fluvio/ProjectFeature.astro', import.meta.url),
    'utf8'
  );
  const projectListItem = await readFile(
    new URL('../src/components/fluvio/ProjectListItem.astro', import.meta.url),
    'utf8'
  );
  const platformFeature = await readFile(
    new URL('../src/components/fluvio/PlatformFeature.astro', import.meta.url),
    'utf8'
  );
  assert.match(projectRoute, /export function getStaticPaths\s*\(/);
  assert.match(projectRoute, /import\s*\{\s*projects\s*\}\s*from\s*['"]~\/data\/fluvio\/projects['"]/);
  assert.match(projectRoute, /projects\.map\s*\(/);
  assert.match(largeImage, /sizes\?:\s*string/);
  assert.match(largeImage, /sizes=\{imageSizes\}/);
  assert.equal(projectFeature.match(/localeHref\(`\/\$\{project\.slug\}`, locale\)/g)?.length, 1);
  assert.equal(projectListItem.match(/localeHref\(`\/\$\{project\.slug\}`, locale\)/g)?.length, 1);
  assert.match(projectFeature, /<h2>\{project\.title\}<\/h2>/);
  assert.match(
    projectFeature,
    /<a class="fluvio-project-feature__link" href=\{projectHref\}\s*>\s*\{strings\.viewProject\}/
  );
  assert.match(projectListItem, /<h3>\{project\.title\}<\/h3>/);
  assert.match(
    projectListItem,
    /<a class="fluvio-project-item__link" href=\{projectHref\}\s*>\s*\{strings\.readProject\}/
  );
  assert.match(projectFeature, /alt=\{project\.heroAlt\}/);
  assert.match(projectListItem, /alt=\{project\.heroAlt\}/);
  assert.doesNotMatch(platformFeature, /target=["']_blank["']/);
});

test('Fluvio primary pages exist without public template content', async () => {
  const sources = await Promise.all(
    primaryPageFiles.map(async (path) => {
      await access(new URL(`../${path}`, import.meta.url));
      return readFile(new URL(`../${path}`, import.meta.url), 'utf8');
    })
  );

  for (const source of sources) {
    assert.doesNotMatch(source, /Get template|AstroWind|Pricing|SaaS|images\.unsplash\.com/i);
  }
});

test('Fluvio hero slider exposes five accessible, localised, motion-aware slides', async () => {
  const slider = await readFile(new URL('../src/components/fluvio/HeroSlider.astro', import.meta.url), 'utf8');

  const homepage = getHomepage('en');
  for (const image of [
    'home-river.jpg',
    'project-bina.jpeg',
    'project-honiara.jpeg',
    'project-advance-queensland.jpeg',
    'vision-field-team.jpeg',
  ]) {
    assert.ok(homepage.slides.some((slide) => slide.image.endsWith(image)));
  }
  assert.equal(homepage.slides.length, 5);
  assert.equal(homepage.slides[0].title, 'Technology for a more resilient water future.');
  assert.equal(en.slider.pauseAria, 'Pause automatic slide rotation');
  assert.equal(en.slider.resumeAria, 'Resume automatic slide rotation');
  assert.equal(en.slider.previous, 'Previous slide');
  assert.equal(en.slider.next, 'Next slide');
  assert.match(slider, /const INTERVAL_MS = 6000;/);
  assert.match(slider, /aria-live=["']polite["']/);
  assert.match(slider, /<fluvio-hero-slider[^>]*role=["']region["']/);
  assert.match(slider, /aria-label=\{strings\.previous\}/);
  assert.match(slider, /aria-label=\{strings\.next\}/);
  assert.match(slider, /data-hero-playback/);
  assert.doesNotMatch(slider, /aria-pressed/);
  assert.match(slider, /ArrowLeft/);
  assert.match(slider, /ArrowRight/);
  assert.match(slider, /prefers-reduced-motion/);
});

test('Fluvio recovery and contact routes use explicit destinations', async () => {
  const [about, services, notFound] = await Promise.all(
    ['about.astro', 'services.astro', '404.astro'].map((file) =>
      readFile(new URL(`../src/pages/${file}`, import.meta.url), 'utf8')
    )
  );
  const contact = await readFile(new URL('../src/components/pages/ContactPage.astro', import.meta.url), 'utf8');

  assert.match(about, /Astro\.redirect\(getPermalink\(['"]\/vision['"]\),\s*301\)/);
  assert.match(services, /Astro\.redirect\(getPermalink\(['"]\/expertise['"]\),\s*301\)/);
  for (const href of ['/', '/expertise', '/projects'])
    assert.match(notFound, new RegExp(`getPermalink\\('${href}'\\)`));
  assert.match(contact, /mailto:\?subject=/);
  assert.equal(getNavigation('en').linkedinUrl, 'https://www.linkedin.com/company/fluvioptyltd/');
  assert.match(contact, /navigation\.linkedinUrl/);
  assert.doesNotMatch(contact + en.contactPage.enquiryNote, /within \d+ hours|attachment upload|server submission/i);
});
