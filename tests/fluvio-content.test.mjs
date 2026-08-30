import assert from 'node:assert/strict';
import test from 'node:test';

import { expertiseAreas } from '../src/data/fluvio/expertise.ts';
import { projects } from '../src/data/fluvio/projects.ts';
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
