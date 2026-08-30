import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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
  for (const label of ['Vision', 'Expertise', 'Projects', 'Team', 'Contact']) {
    assert.match(navigation, new RegExp(label));
  }
});
