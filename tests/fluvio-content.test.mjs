import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

import { expertiseAreas } from '../src/data/fluvio/expertise.ts';
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
    assert.match(item.heroImage || item.image || item.portrait, /^~\/assets\/images\/fluvio\//);
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
  assert.match(siteContent.heroImage, /^~\/assets\/images\/fluvio\//);
  assert.equal(siteContent.vision.title, 'Vision');
  assert.ok(siteContent.vision.description);
  assert.match(siteContent.vision.image, /^~\/assets\/images\/fluvio\//);
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
    assert.match(navigation, new RegExp(label));
  }
});

test('Fluvio project experience provides shared components and static project routes', async () => {
  await Promise.all(projectExperienceFiles.map((path) => access(new URL(`../${path}`, import.meta.url))));

  const projectRoute = await readFile(new URL('../src/pages/[slug].astro', import.meta.url), 'utf8');
  const largeImage = await readFile(new URL('../src/components/fluvio/LargeImage.astro', import.meta.url), 'utf8');
  const projectFeature = await readFile(new URL('../src/components/fluvio/ProjectFeature.astro', import.meta.url), 'utf8');
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
  assert.equal(projectFeature.match(/href=\{`\/\$\{project\.slug\}`\}/g)?.length, 1);
  assert.equal(projectListItem.match(/href=\{`\/\$\{project\.slug\}`\}/g)?.length, 1);
  assert.match(projectFeature, /<h2>\{project\.title\}<\/h2>/);
  assert.match(projectFeature, /<a class="fluvio-project-feature__link" href=\{`\/\$\{project\.slug\}`\}>View project/);
  assert.match(projectListItem, /<h3>\{project\.title\}<\/h3>/);
  assert.match(projectListItem, /<a class="fluvio-project-item__link" href=\{`\/\$\{project\.slug\}`\}>Read the project/);
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

test('Fluvio hero slider exposes three accessible, motion-aware slides', async () => {
  const slider = await readFile(new URL('../src/components/fluvio/HeroSlider.astro', import.meta.url), 'utf8');

  for (const image of ['home-river.jpg', 'expertise-stream-monitoring.jpg', 'vision-kovi-river.jpg']) {
    assert.match(slider, new RegExp(image.replace('.', '\\.')));
  }
  assert.match(slider, /Technology for a more resilient water future\./);
  assert.match(slider, /aria-live=["']polite["']/);
  assert.match(slider, /aria-label=["']Previous slide["']/);
  assert.match(slider, /aria-label=["']Next slide["']/);
  assert.match(slider, /ArrowLeft/);
  assert.match(slider, /ArrowRight/);
  assert.match(slider, /prefers-reduced-motion/);
});

test('Fluvio recovery and contact routes use explicit destinations', async () => {
  const [about, services, notFound, contact] = await Promise.all(
    ['about.astro', 'services.astro', '404.astro', 'contact.astro'].map((file) =>
      readFile(new URL(`../src/pages/${file}`, import.meta.url), 'utf8')
    )
  );

  assert.match(about, /Astro\.redirect\(['"]\/vision['"],\s*301\)/);
  assert.match(services, /Astro\.redirect\(['"]\/expertise['"],\s*301\)/);
  for (const href of ['/', '/expertise', '/projects']) assert.match(notFound, new RegExp(`href=["']${href}["']`));
  assert.match(contact, /href=["']mailto:/);
  assert.match(contact, /https:\/\/www\.linkedin\.com\/company\/fluvioptyltd\//);
  assert.doesNotMatch(contact, /within \d+ hours|attachment upload|server submission/i);
});
