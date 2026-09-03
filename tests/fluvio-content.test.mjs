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
  getPages,
  getProjects,
  getSiteContent,
  getTeamMembers,
} from '../src/data/fluvio/store.ts';
import { featuredProjects, getProjectBySlug, projects } from '../src/data/fluvio/projects.ts';
import { siteContent } from '../src/data/fluvio/site.ts';
import { teamMembers } from '../src/data/fluvio/team.ts';
import { plainText, splitAccent } from '../src/utils/accent.ts';

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

const expectedTeamSlugs = [
  'simon-albert',
  'alistair-grinham',
  'nick-hutley',
  'melanie-johnson',
  'louis-ray',
  'mandus-boselalu',
  'mubashir-imran',
  'yuval-kark-levin',
  'eric-cheung',
];

const expectedExpertiseTitles = [
  'Innovative hydrological monitoring',
  'Island-scale and catchment modelling',
  'Catchment and water resource management',
  'Blue carbon and greenhouse gas assessment',
  'Operational monitoring systems',
  'Sediment transport and reservoir assessment',
];

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const config = await read('src/config.yaml');
const navigation = await read('src/navigation.ts');
const homepage = await read('src/pages/index.astro');
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

/* The shared components every content page is built from. */
const sharedComponentFiles = [
  'src/components/fluvio/Accent.astro',
  'src/components/fluvio/AdjacentNav.astro',
  'src/components/fluvio/ArrowIcon.astro',
  'src/components/fluvio/ArrowLink.astro',
  'src/components/fluvio/Breadcrumbs.astro',
  'src/components/fluvio/ContactPanel.astro',
  'src/components/fluvio/DisciplineTicker.astro',
  'src/components/fluvio/ExpertiseCard.astro',
  'src/components/fluvio/ExpertiseMedia.astro',
  'src/components/fluvio/LargeImage.astro',
  'src/components/fluvio/LinkList.astro',
  'src/components/fluvio/PageHero.astro',
  'src/components/fluvio/PlatformFeature.astro',
  'src/components/fluvio/ProjectCard.astro',
  'src/components/fluvio/ProjectFeature.astro',
  'src/components/fluvio/ProjectGallery.astro',
  'src/components/fluvio/ProjectMeta.astro',
  'src/components/fluvio/SectionFrame.astro',
  'src/components/fluvio/SectionHeading.astro',
  'src/components/fluvio/TeamCard.astro',
];

const primaryPageFiles = [
  'src/pages/index.astro',
  'src/pages/vision.astro',
  'src/pages/expertise.astro',
  'src/pages/projects.astro',
  'src/pages/team.astro',
  'src/pages/contact.astro',
];

/* One route file per record type, in English and under every other locale. */
const recordRouteFiles = [
  'src/pages/[slug].astro',
  'src/pages/expertise/[slug].astro',
  'src/pages/team/[slug].astro',
  'src/pages/[lang]/[slug].astro',
  'src/pages/[lang]/expertise/[slug].astro',
  'src/pages/[lang]/team/[slug].astro',
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

test('Fluvio team and expertise records use the specified names, slugs and labels', () => {
  assert.deepEqual(
    teamMembers.map(({ name }) => name),
    expectedTeamNames
  );
  // Team slugs come from the record file names, so profile URLs are stable.
  assert.deepEqual(
    teamMembers.map(({ slug }) => slug),
    expectedTeamSlugs
  );
  assert.deepEqual(
    expertiseAreas.map(({ title }) => title),
    expectedExpertiseTitles
  );
});

test('Fluvio cross-references resolve and every area has evidence and people', () => {
  const projectSlugs = new Set(projects.map(({ slug }) => slug));
  const areaSlugs = new Set(expertiseAreas.map(({ slug }) => slug));

  for (const area of expertiseAreas) {
    assert.ok(area.relatedProjects.length > 0, `${area.slug} lists no projects`);
    for (const slug of area.relatedProjects) assert.ok(projectSlugs.has(slug), `${area.slug} -> ${slug}`);
    assert.ok(area.highlights?.length >= 3, `${area.slug} needs highlights for its page`);
    assert.ok(
      teamMembers.some((member) => member.expertise?.includes(area.slug)),
      `${area.slug} has no specialists`
    );
  }
  for (const project of projects) {
    for (const slug of project.relatedProjects ?? []) {
      assert.ok(projectSlugs.has(slug), `${project.slug} -> ${slug}`);
      assert.notEqual(slug, project.slug);
    }
    assert.ok(
      expertiseAreas.some((area) => area.relatedProjects.includes(project.slug)),
      `${project.slug} belongs to no expertise area`
    );
  }
  for (const member of teamMembers) {
    assert.ok(member.expertise?.length > 0, `${member.slug} has no expertise areas`);
    for (const slug of member.expertise) assert.ok(areaSlugs.has(slug), `${member.slug} -> ${slug}`);
  }
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

test('Fluvio heading accents are balanced and strip to plain text', () => {
  assert.deepEqual(splitAccent('Water *as it moves*.'), [
    { text: 'Water ', accent: false },
    { text: 'as it moves', accent: true },
    { text: '.', accent: false },
  ]);
  assert.equal(plainText('Water *as it moves*.'), 'Water as it moves.');

  // Every heading string in every locale either has no markup or exactly one pair.
  const headings = (locale) => {
    const pages = getPages(locale);
    const home = getHomepage(locale);
    return [
      ...home.slides.map(({ title }) => title),
      home.expertiseTitle,
      home.projectsTitle,
      home.platformsTitle,
      home.teamTitle,
      home.impactTitle,
      pages.visionPage.title,
      pages.expertisePage.title,
      pages.teamPage.title,
      pages.contactPage.title,
      pages.projectsPage.title,
      pages.contactPanel.title,
      pages.projectDetail.contactTitle,
      pages.expertiseDetail.contactTitle,
      pages.teamDetail.contactTitle,
    ];
  };
  for (const locale of contentLocales) {
    for (const heading of headings(locale)) {
      const stars = (heading.match(/\*/g) ?? []).length;
      assert.ok(stars === 0 || stars === 2, `${locale}: unbalanced accent in "${heading}"`);
      assert.doesNotMatch(plainText(heading), /\*/);
    }
  }
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
  // The store schema requires every string in every locale; importing it at
  // all proves completeness. Pin structural parity and real translation here.
  const keyPaths = (value, prefix = '') =>
    Object.entries(value).flatMap(([key, child]) =>
      child && typeof child === 'object' ? keyPaths(child, `${prefix}${key}.`) : [`${prefix}${key}`]
    );

  const reference = keyPaths(getPages('en')).sort();
  for (const locale of ['pijin', 'fr', 'es']) {
    assert.deepEqual(keyPaths(getPages(locale)).sort(), reference);
    assert.notEqual(getPages(locale).visionPage.title, getPages('en').visionPage.title);
    assert.notEqual(getPages(locale).teamDetail.expertiseTitle, getPages('en').teamDetail.expertiseTitle);
    assert.notEqual(getPages(locale).expertiseDetail.highlightsTitle, getPages('en').expertiseDetail.highlightsTitle);
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
    assert.deepEqual(
      getTeamMembers(locale).map(({ slug }) => slug),
      expectedTeamSlugs
    );
    assert.equal(getExpertiseAreas(locale).length, 6);
    assert.equal(getSiteContent(locale).values.length, 5);
    for (const key of ['vision', 'expertise', 'projects', 'team', 'contact', 'startProject', 'linkedinUrl']) {
      assert.ok(getNavigation(locale)[key]);
    }
    for (const area of getExpertiseAreas(locale)) assert.ok(area.highlights?.length >= 3);
  }
  // Translated locales actually differ from English where language differs.
  assert.notEqual(getProjects('fr')[0].title, getProjects('en')[0].title);
  assert.notEqual(getTeamMembers('es')[0].role, getTeamMembers('en')[0].role);
  assert.notEqual(getProjects('pijin')[0].title, getProjects('en')[0].title);
  assert.notEqual(getExpertiseAreas('fr')[0].highlights[0], getExpertiseAreas('en')[0].highlights[0]);
});

test('Fluvio locale routes exist for every page and record type', async () => {
  const localePages = ['index', 'vision', 'expertise', 'projects', 'team', 'contact'];
  await Promise.all(localePages.map((page) => access(new URL(`../src/pages/[lang]/${page}.astro`, import.meta.url))));
  await Promise.all(recordRouteFiles.map((path) => access(new URL(`../${path}`, import.meta.url))));

  // The locale list lives in src/i18n; route files must not hardcode it.
  const i18n = await read('src/i18n/index.ts');
  assert.match(i18n, /export const locales = \['en', 'pijin', 'fr', 'es'\] as const;/);
  for (const page of localePages) {
    const source = await read(`src/pages/[lang]/${page}.astro`);
    assert.match(source, /localeStaticPaths\(\)/);
    assert.doesNotMatch(source, /'pijin'|'fr'|'es'/);
  }
  for (const path of recordRouteFiles.filter((file) => file.startsWith('src/pages/[lang]/'))) {
    const source = await read(path);
    assert.match(source, /localeRecordStaticPaths\(/);
    assert.doesNotMatch(source, /'pijin'|'fr'|'es'/);
  }
});

test('Fluvio public sources contain no demonstration copy or routes', async () => {
  for (const source of publicSourceFiles) {
    const text = await readFile(source, 'utf8');
    assert.doesNotMatch(text, /Get template|AstroWind|SaaS|Pricing|Unsplash/i);
  }

  assert.doesNotMatch(config, /isEnabled:\s*true/);
  assert.doesNotMatch(navigation, /blog|rss/i);
});

test('Fluvio detail pages share components and build links through the route helpers', async () => {
  await Promise.all(sharedComponentFiles.map((path) => access(new URL(`../${path}`, import.meta.url))));

  const projectRoute = await read('src/pages/[slug].astro');
  const expertiseRoute = await read('src/pages/expertise/[slug].astro');
  const teamRoute = await read('src/pages/team/[slug].astro');
  const routes = await read('src/data/fluvio/routes.ts');
  const largeImage = await read('src/components/fluvio/LargeImage.astro');
  const projectCard = await read('src/components/fluvio/ProjectCard.astro');
  const projectFeature = await read('src/components/fluvio/ProjectFeature.astro');
  const expertiseCard = await read('src/components/fluvio/ExpertiseCard.astro');
  const teamCard = await read('src/components/fluvio/TeamCard.astro');
  const platformFeature = await read('src/components/fluvio/PlatformFeature.astro');

  assert.match(projectRoute, /export function getStaticPaths\s*\(/);
  assert.match(projectRoute, /import\s*\{\s*projects\s*\}\s*from\s*['"]~\/data\/fluvio\/projects['"]/);
  assert.match(expertiseRoute, /import\s*\{\s*expertiseAreas\s*\}\s*from\s*['"]~\/data\/fluvio\/expertise['"]/);
  assert.match(teamRoute, /import\s*\{\s*teamMembers\s*\}\s*from\s*['"]~\/data\/fluvio\/team['"]/);

  // Project URLs stay flat: they predate this site and are linked externally.
  assert.match(routes, /projectPath = \(slug: string\): string => `\/\$\{slug\}`/);
  assert.match(routes, /expertisePath = \(slug: string\): string => `\/expertise\/\$\{slug\}`/);
  assert.match(routes, /teamMemberPath = \(slug: string\): string => `\/team\/\$\{slug\}`/);

  assert.match(largeImage, /sizes\?:\s*string/);
  assert.match(largeImage, /transitionName\?:\s*string/);
  for (const [source, helper] of [
    [projectCard, 'projectHref(project.slug, locale)'],
    [projectFeature, 'projectHref(project.slug, locale)'],
    [expertiseCard, 'expertiseHref(area.slug, locale)'],
    [teamCard, 'teamMemberHref(member.slug, locale)'],
  ]) {
    assert.equal(source.split(helper).length - 1, 1, `${helper} used exactly once`);
    assert.doesNotMatch(source, /localeHref\(`\//);
  }
  assert.match(projectCard, /alt=\{project\.heroAlt\}/);
  assert.match(projectFeature, /alt=\{project\.heroAlt\}/);
  assert.match(projectCard, /\{strings\.viewProject\}/);
  assert.match(projectFeature, /<h2>\s*<a href=\{href\}>\{project\.title\}<\/a>\s*<\/h2>/);
  assert.match(teamCard, /transitionName=\{`team-\$\{member\.slug\}`\}/);
  assert.match(projectCard, /transitionName=\{`project-\$\{project\.slug\}`\}/);
  assert.doesNotMatch(platformFeature, /target=["']_blank["']/);

  // Bare unicode arrows are gone from the interface; the shared arrow control is used instead.
  const arrowHosts = await Promise.all(
    ['ContactPanel', 'HeroSlider', 'PlatformFeature', 'ProjectCard', 'TeamCard', 'ExpertiseCard', 'LinkList'].map(
      (name) => read(`src/components/fluvio/${name}.astro`)
    )
  );
  for (const source of arrowHosts) assert.doesNotMatch(source, /→|↗|←/);
});

test('Fluvio related content never repeats the photography already on the page', async () => {
  const { getRelatedProjects, withoutImages, getAdjacent, getProjectsForMember } =
    await import('../src/data/fluvio/relations.ts');
  for (const project of projects) {
    const related = getRelatedProjects('en', project);
    assert.ok(related.length > 0, `${project.slug} has nothing to continue to`);
    assert.ok(related.every((candidate) => candidate.slug !== project.slug));
    const deduped = withoutImages(related, [project.heroImage], (candidate) => candidate.heroImage);
    assert.ok(deduped.every((candidate) => candidate.heroImage !== project.heroImage));
  }
  const adjacent = getAdjacent(projects, projects[0].slug);
  assert.equal(adjacent.previous.slug, projects.at(-1).slug);
  assert.equal(adjacent.next.slug, projects[1].slug);
  for (const member of teamMembers) assert.ok(getProjectsForMember('en', member).length > 0, member.slug);
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
  const slider = await read('src/components/fluvio/HeroSlider.astro');

  const homepage = getHomepage('en');
  for (const image of [
    'home-river.jpg',
    'home-field-river-sensor.jpg',
    'expertise-siwis-dashboard.jpg',
    'home-operations-laptop.jpeg',
    'vision-field-team.jpeg',
  ]) {
    assert.ok(
      homepage.slides.some((slide) => slide.image.endsWith(image)),
      image
    );
  }
  // No slide photograph is reused as a project's lead image.
  const projectHeroes = new Set(projects.map(({ heroImage }) => heroImage));
  for (const slide of homepage.slides) assert.ok(!projectHeroes.has(slide.image), slide.image);

  assert.equal(homepage.slides.length, 5);
  assert.equal(plainText(homepage.slides[0].title), 'Technology for a more resilient water future.');
  assert.equal(getPages('en').slider.pauseAria, 'Pause automatic slide rotation');
  assert.equal(getPages('en').slider.resumeAria, 'Resume automatic slide rotation');
  assert.equal(getPages('en').slider.previous, 'Previous slide');
  assert.equal(getPages('en').slider.next, 'Next slide');
  assert.match(slider, /const INTERVAL_MS = 3000;/);
  assert.match(slider, /const VIDEO_MAX_MS = 30000;/);
  assert.match(slider, /data-hero-video/);
  assert.match(slider, /aria-live=["']polite["']/);
  assert.match(slider, /<fluvio-hero-slider[^>]*role=["']region["']/);
  assert.match(slider, /aria-label=\{strings\.previous\}/);
  assert.match(slider, /aria-label=\{strings\.next\}/);
  assert.match(slider, /data-hero-playback/);
  assert.match(slider, /plainText\(slides\[0\]\.title\)/);
  assert.doesNotMatch(slider, /aria-pressed/);
  assert.match(slider, /ArrowLeft/);
  assert.match(slider, /ArrowRight/);
  assert.match(slider, /prefers-reduced-motion/);
});

test('Fluvio recovery and contact routes use explicit destinations', async () => {
  const [about, services, notFound] = await Promise.all(
    ['about.astro', 'services.astro', '404.astro'].map((file) => read(`src/pages/${file}`))
  );
  const contact = await read('src/components/pages/ContactPage.astro');

  assert.match(about, /Astro\.redirect\(getPermalink\(['"]\/vision['"]\),\s*301\)/);
  assert.match(services, /Astro\.redirect\(getPermalink\(['"]\/expertise['"]\),\s*301\)/);
  for (const href of ['/', '/expertise', '/projects'])
    assert.match(notFound, new RegExp(`getPermalink\\('${href}'\\)`));
  assert.match(contact, /mailto:\?subject=/);
  assert.equal(getNavigation('en').linkedinUrl, 'https://www.linkedin.com/company/fluvioptyltd/');
  assert.match(contact, /navigation\.linkedinUrl/);
  assert.doesNotMatch(
    contact + getPages('en').contactPage.enquiryNote,
    /within \d+ hours|attachment upload|server submission/i
  );
});
