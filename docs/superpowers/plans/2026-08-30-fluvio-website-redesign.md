# Fluvio Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all AstroWind demonstration branding with a complete, polished Fluvio consultancy website driven by verified archived content and reusable typed data.

**Architecture:** Keep AstroWind's global layout, configuration loader, image pipeline and accessible navigation patterns. Add focused Fluvio components under `src/components/fluvio/`, typed content under `src/data/fluvio/`, and a shared flat project-detail route at `src/pages/[slug].astro`. Use large local photography for foreground content and a pointer-safe CSS atmosphere behind page sections.

**Tech Stack:** Astro 7, TypeScript 5.9, Tailwind CSS 4, Astro Assets with Sharp, Astro Icon, static generation

## Global Constraints

- AstroWind remains the structural foundation.
- Main project photography must be large, clean and never covered by decorative effects or text overlays.
- Hydrological and technology motion appears only behind page content, uses `pointer-events: none`, and becomes static under `prefers-reduced-motion`.
- Use a normal cursor and do not add scroll hijacking, fake data interfaces, animation frameworks or unverified claims.
- Use archived content from `/Users/muhammadimran/Mubashir/FluvioWebsite/Old` as the factual source of truth.
- Preserve the nine legacy flat project slugs exactly.
- Keep page copy professional, concise and suitable for government, infrastructure, research and community partners.
- Use warm white and soft mist backgrounds, deep navy structure, river blue/teal, mineral blue, silt gold and restrained field coral. Green remains primarily in photography and does not dominate page surfaces.
- Use Astro's local image optimisation and meaningful alternative text.
- A new project, team member or expertise area must be addable through typed content rather than a new layout.
- Do not publish a non-functional contact form or promise a response time that has not been verified.
- Preserve WCAG AA contrast, keyboard navigation, visible focus states, reduced-motion support and responsive layouts.
- Keep tests lean: maintain one content and route contract test and use Astro's normal build, type, lint and formatting checks. Do not add a browser-testing framework.
- Use pointer-responsive background contours, restrained page transitions and refined navigation motion to keep the site modern and engaging without placing decorative effects over foreground elements.
- Node.js must satisfy the repository requirement `>=22.22.3`.
- `npm run build` and `npm run check` must pass before completion.

---

### Task 1: Typed Fluvio content and optimised asset library

**Files:**

- Create: `src/data/fluvio/types.ts`
- Create: `src/data/fluvio/site.ts`
- Create: `src/data/fluvio/expertise.ts`
- Create: `src/data/fluvio/team.ts`
- Create: `src/data/fluvio/projects.ts`
- Create: `tests/fluvio-content.test.mjs`
- Create: `src/assets/images/fluvio/*`
- Modify: `package.json`

**Interfaces:**

- Produces: `SiteContent`, `ExpertiseArea`, `TeamMember`, `Project`, `siteContent`, `expertiseAreas`, `teamMembers`, `projects`, `featuredProjects`, `getProjectBySlug(slug)`.
- Project slugs: `advance-queensland`, `bina`, `monitoring-honiara`, `ghg-emissions-reservoirs`, `wrd`, `tina`, `sol-trader-oil-spill`, `cordap`, `reservoir-sedimentation`.
- Image strings use the `~/assets/images/fluvio/<filename>` form accepted by AstroWind's image resolver.

- [ ] **Step 1: Add failing content-contract tests**

Create a Node test that imports the typed data modules and verifies the exact project count, unique legacy slugs, nine named team profiles, six expertise areas, required summaries and local image references.

```js
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
```

- [ ] **Step 2: Run the content test and confirm it fails**

Run: `node --experimental-strip-types --test tests/fluvio-content.test.mjs`

Expected: FAIL because the `src/data/fluvio` modules do not exist.

- [ ] **Step 3: Define the typed content contracts**

Use optional metadata so incomplete archived facts are omitted cleanly.

```ts
export interface Project {
  title: string;
  slug: string;
  summary: string;
  location?: string;
  timeframe?: string;
  disciplines: string[];
  partners?: string[];
  heroImage: string;
  heroAlt: string;
  gallery?: Array<{ src: string; alt: string; caption?: string }>;
  challenge: string[];
  approach: string[];
  outcome: string[];
  featured?: boolean;
  relatedProjects?: string[];
}

export interface TeamMember {
  name: string;
  role?: string;
  bio: string;
  portrait: string;
  portraitAlt: string;
  specialties: string[];
  profileUrl?: string;
}

export interface ExpertiseArea {
  title: string;
  slug: string;
  summary: string;
  description: string[];
  image: string;
  imageAlt: string;
  relatedProjects: string[];
}
```

- [ ] **Step 4: Build the verified content modules**

Transcribe and lightly edit grammar from `Old/content/01-home.md` through `Old/content/13-reservoir-sedimentation.md`. Do not add facts not present in the archive. Export the following selectors exactly:

```ts
export const featuredProjects = projects.filter(({ featured }) => featured);
export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
```

Use the six expertise labels and nine team names listed in the design specification. Mark Tina, Greater Honiara and Advance Queensland as featured homepage projects.

- [ ] **Step 5: Copy and rename the selected archive images**

Copy the verified source files from `Old/images/` into `src/assets/images/fluvio/` with descriptive lowercase names. The required set is:

```text
logo.png
home-river.jpg
vision-kovi-river.jpg
vision-field-team.jpeg
expertise-stream-monitoring.jpg
expertise-coastal-model.png
project-tina.jpeg
project-tina-station.png
project-ghg-reservoirs.jpg
project-honiara.jpeg
project-wrd-field.jpg
project-wrd-workshop.jpg
project-advance-queensland.jpeg
project-bina.jpeg
project-sol-trader.jpg
project-sol-trader-aerial.png
project-cordap.jpeg
project-reservoir-sedimentation.jpeg
team-simon.png
team-alistair.png
team-nick.png
team-melanie.jpeg
team-louis.jpeg
team-mandus.jpg
team-mubashir.jpg
team-yuval.jpg
team-eric.jpeg
```

- [ ] **Step 6: Add and run the content test script**

Add `"test": "node --experimental-strip-types --test tests/*.test.mjs"` to `package.json`.

Run: `npm test`

Expected: one test file passes with no failures.

- [ ] **Step 7: Commit the content foundation**

```bash
git add package.json tests src/data/fluvio src/assets/images/fluvio
git commit -m "feat: add Fluvio content foundation"
```

### Task 2: Brand shell and background atmosphere

**Files:**

- Create: `src/components/fluvio/PageBackground.astro`
- Create: `src/components/fluvio/SectionHeading.astro`
- Modify: `src/components/CustomStyles.astro`
- Modify: `src/assets/styles/tailwind.css`
- Modify: `src/components/Logo.astro`
- Modify: `src/components/widgets/Header.astro`
- Modify: `src/components/widgets/Footer.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/layouts/PageLayout.astro`
- Modify: `src/config.yaml`
- Modify: `src/navigation.ts`

**Interfaces:**

- Consumes: `siteContent` from Task 1.
- Produces: global Fluvio header/footer, `PageBackground`, `SectionHeading`, updated metadata and tokens.
- `PageBackground` accepts `variant?: 'default' | 'quiet' | 'deep'` and never captures pointer events.
- `SectionHeading` accepts `eyebrow?`, `title`, `intro?`, `align?: 'left' | 'split'`.

- [ ] **Step 1: Add structural brand assertions**

Extend `tests/fluvio-content.test.mjs` to read `src/config.yaml` and `src/navigation.ts`, then assert that Fluvio is named, legacy demo labels are absent, and primary links include Vision, Expertise, Projects, Team and Contact.

```js
const config = await readFile(new URL('../src/config.yaml', import.meta.url), 'utf8');
const navigation = await readFile(new URL('../src/navigation.ts', import.meta.url), 'utf8');
assert.match(config, /name:\s*Fluvio/);
assert.doesNotMatch(config + navigation, /Get template|SaaS|Pricing|AstroWind/);
for (const label of ['Vision', 'Expertise', 'Projects', 'Team', 'Contact']) assert.match(navigation, new RegExp(label));
```

- [ ] **Step 2: Run the tests and confirm the brand assertions fail**

Run: `npm test`

Expected: FAIL because template branding and navigation remain.

- [ ] **Step 3: Update the design tokens and typography**

Map the global colour variables to near-black green, warm white, water teal, pale aqua and mineral grey. Configure one sans family for body/headings, a serif family for rare italic emphasis and a mono family for labels. Keep one accent colour and a working restrained dark theme.

```css
:root {
  --fluvio-ink: 16 24 22;
  --fluvio-paper: 248 250 248;
  --fluvio-water: 20 123 140;
  --fluvio-aqua: 207 232 231;
  --fluvio-mineral: 101 112 108;
}
```

- [ ] **Step 4: Implement the background-only hydrological atmosphere**

`PageBackground.astro` uses fixed or absolute pseudo-elements with low-opacity radial gradients, sparse repeating contours and optional pointer coordinates written to CSS variables. All layers use `pointer-events: none`, negative or zero background stacking, and a reduced-motion rule that removes transitions and transforms.

```astro
<div class:list={['fluvio-atmosphere', `fluvio-atmosphere--${variant}`]} aria-hidden="true"></div>
<style>
  .fluvio-atmosphere {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .fluvio-atmosphere::before,
    .fluvio-atmosphere::after {
      transform: none !important;
      transition: none !important;
    }
  }
</style>
```

- [ ] **Step 5: Rebrand the shell**

Replace the logo, site metadata, header and footer content. Remove the default announcement, RSS link and demo navigation. Keep AstroWind's mobile menu and theme behavior. Use `getPermalink()` for internal links and the verified LinkedIn URL for the social link.

- [ ] **Step 6: Run tests, static checks and build**

Run: `npm test && npm run check:astro && npm run build`

Expected: all commands exit successfully and build output contains the Fluvio homepage shell.

- [ ] **Step 7: Commit the branded shell**

```bash
git add src tests
git commit -m "feat: establish Fluvio brand shell"
```

### Task 3: Reusable editorial components and project experience

**Files:**

- Create: `src/components/fluvio/LargeImage.astro`
- Create: `src/components/fluvio/ExpertiseList.astro`
- Create: `src/components/fluvio/ProjectFeature.astro`
- Create: `src/components/fluvio/ProjectListItem.astro`
- Create: `src/components/fluvio/ProjectMeta.astro`
- Create: `src/components/fluvio/TeamProfile.astro`
- Create: `src/components/fluvio/PlatformFeature.astro`
- Create: `src/components/fluvio/ContactPanel.astro`
- Create: `src/pages/projects.astro`
- Create: `src/pages/[slug].astro`

**Interfaces:**

- Consumes: content types and records from Task 1, `PageBackground` and `SectionHeading` from Task 2.
- Produces: reusable project, expertise, team, platform and contact sections; nine static legacy project routes.
- `LargeImage` owns all image rendering and accepts `src`, `alt`, `caption?`, `priority?`, `aspect?: 'hero' | 'landscape' | 'portrait'`.
- `[slug].astro` exports `getStaticPaths()` from `projects` and passes one `Project` as props.

- [ ] **Step 1: Add route and component contract tests**

Extend the Node tests to confirm `src/pages/projects.astro`, `src/pages/[slug].astro` and every required Fluvio component exist. Read `[slug].astro` and assert that it uses `getStaticPaths` and the shared projects data.

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `npm test`

Expected: FAIL with missing component and route files.

- [ ] **Step 3: Build the editorial component family**

Use AstroWind's `Image.astro` for all local images. Keep foreground elements flat and clean. Components accept typed props and conditionally render optional metadata.

```astro
<figure class:list={['fluvio-image', `fluvio-image--${aspect}`]}>
  <Image src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchpriority={priority ? 'high' : 'auto'} />
  {caption && <figcaption>{caption}</figcaption>}
</figure>
```

- [ ] **Step 4: Build the Projects index**

Create an editorial portfolio with one large featured composition followed by alternating image and copy rows. Include a separate platform section for FluvioSense and FluvioCascade. Do not use equal-size generic marketing cards or autoplay.

- [ ] **Step 5: Build the shared flat project route**

```ts
export function getStaticPaths() {
  return projects.map((project) => ({ params: { slug: project.slug }, props: { project } }));
}
```

Render a project heading, clean hero image, verified metadata, Challenge, Approach and Outcome sections, optional gallery, related expertise/projects and a contact panel. Do not render missing fields.

- [ ] **Step 6: Verify all project routes**

Run: `npm test && npm run check:astro && npm run build`

Expected: all commands pass and `dist/<slug>/index.html` exists for all nine project slugs.

- [ ] **Step 7: Commit the project experience**

```bash
git add src tests
git commit -m "feat: build Fluvio project experience"
```

### Task 4: Homepage, Vision, Expertise, Team, Contact and recovery pages

**Files:**

- Create: `src/components/fluvio/HeroSlider.astro`
- Modify: `src/pages/index.astro`
- Create: `src/pages/vision.astro`
- Create: `src/pages/expertise.astro`
- Create: `src/pages/team.astro`
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/404.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/services.astro`

**Interfaces:**

- Consumes: all typed data and reusable components from Tasks 1 through 3.
- Produces: the complete primary Fluvio page set and redirects from `/about` to `/vision` and `/services` to `/expertise`.

- [ ] **Step 1: Add primary-route assertions**

Extend the Node tests to assert that the six primary page files exist and that no primary page contains template calls to action such as `Get template`, `AstroWind`, `Pricing`, `SaaS` or generic Unsplash URLs.

- [ ] **Step 2: Run tests and confirm the page assertions fail**

Run: `npm test`

Expected: FAIL because the homepage and template pages still contain demonstration content.

- [ ] **Step 3: Build the accessible hero slider**

Create three large copy-and-image slides using `home-river.jpg`, `expertise-stream-monitoring.jpg` and `vision-kovi-river.jpg`. Lead with `Technology for a more resilient water future.` and follow with concise themes for field intelligence and collaborative delivery. Keep images and copy in separate grid regions. Provide labelled previous and next buttons, slide numbers, a progress line, keyboard operation and polite state announcements. Autoplay may advance every eight seconds, but it must pause on hover or focus and remain on the first slide under `prefers-reduced-motion`.

- [ ] **Step 4: Build the remaining homepage narrative**

After the slider, use this section order exactly: compact capability strip; expertise introduction; three featured projects; FluvioSense and FluvioCascade; selected specialists; partner and regional impact statement; contact panel.

- [ ] **Step 5: Build Vision and Expertise**

Vision presents the archived vision statement and the five values Innovation, Integrity, Collaboration, Sustainability and Empowerment with large still imagery. Expertise presents all six typed capability areas with related projects and a concise path to Team.

- [ ] **Step 6: Build Team and Contact**

Team renders all nine `TeamProfile` records with large consistent portraits. Contact provides a `mailto:` project enquiry action and LinkedIn link. It may show a labelled message form that creates a mail action, but it must not claim server submission, attachment upload or a response time.

- [ ] **Step 7: Build redirects and the not-found page**

Use `Astro.redirect('/vision', 301)` in `about.astro` and `Astro.redirect('/expertise', 301)` in `services.astro`. The not-found page links to Home, Expertise and Projects.

- [ ] **Step 8: Verify the full primary route set**

Run: `npm test && npm run check:astro && npm run build`

Expected: all commands pass. The generated output includes `/`, `/vision`, `/expertise`, `/projects`, `/team`, `/contact`, `/404` and all nine project routes.

- [ ] **Step 9: Commit the primary pages**

```bash
git add src tests
git commit -m "feat: complete Fluvio consultancy pages"
```

### Task 5: Remove demonstration surfaces, document extension and complete visual verification

**Files:**

- Delete: `src/pages/homes/`
- Delete: `src/pages/landing/`
- Delete: `src/pages/pricing.astro`
- Delete: `src/pages/[...blog]/`
- Delete: `src/data/post/`
- Modify: `src/config.yaml`
- Modify: `README.md`
- Modify: `tests/fluvio-content.test.mjs`

**Interfaces:**

- Consumes: completed Fluvio site.
- Produces: a clean public route surface, documented extension workflow and final verification evidence.

- [ ] **Step 1: Add the final no-demo assertions**

Add a repository scan to the Node test that excludes `node_modules`, `.git`, `dist`, `.superpowers` and documentation, then fails on visible demonstration strings in `src/pages`, `src/navigation.ts` or `src/config.yaml`.

```js
for (const source of publicSourceFiles) {
  const text = await readFile(source, 'utf8');
  assert.doesNotMatch(text, /Get template|AstroWind|SaaS|Pricing|Unsplash/);
}
```

- [ ] **Step 2: Run tests and confirm remaining demonstration routes fail**

Run: `npm test`

Expected: FAIL until public demonstration pages and blog content are removed or disabled.

- [ ] **Step 3: Remove public demonstration content and disable blog output**

Delete the listed demonstration routes and posts. Set blog configuration to disabled and confirm navigation, sitemap and RSS references are absent from the public shell.

- [ ] **Step 4: Document content extension**

Update `README.md` with exact instructions for:

- Adding a project record and images
- Adding a team member
- Adding an expertise area
- Updating navigation and site metadata
- Configuring a real contact endpoint later
- Running `npm test`, `npm run check` and `npm run build`

- [ ] **Step 5: Run automated verification**

Run: `npm test && npm run check && npm run build`

Expected: all commands exit successfully with no formatting, lint, type or build errors.

- [ ] **Step 6: Commit cleanup and documentation**

```bash
git add -A
git commit -m "chore: finish Fluvio site cleanup"
```

### Task 6: Multi-colour visual polish and browser verification

**Files:**

- Modify: `src/components/CustomStyles.astro`
- Modify: `src/assets/styles/tailwind.css`
- Modify: `src/components/fluvio/PageBackground.astro`
- Modify: `src/components/fluvio/*.astro`
- Modify: `src/components/widgets/Header.astro`
- Modify: `src/components/widgets/Footer.astro`
- Modify: `src/pages/*.astro`

**Interfaces:**

- Consumes: the completed Fluvio content, shell, project system and primary pages.
- Produces: a balanced multi-colour visual system and verified desktop/mobile experience without changing routes or factual content.

- [ ] **Step 1: Replace the green-dominant palette**

Use these core values and derive accessible light/dark variants from them:

```css
:root {
  --fluvio-paper: #fbfcfa;
  --fluvio-mist: #f1f6f8;
  --fluvio-ink: #13202a;
  --fluvio-navy: #173b57;
  --fluvio-river: #2f7d94;
  --fluvio-teal: #3b8587;
  --fluvio-mineral: #7089ad;
  --fluvio-silt: #c39a5b;
  --fluvio-coral: #d9765b;
}
```

Warm white and mist lead the background. Navy leads typography and dark bands. Blue and teal communicate water and technology. Silt and coral appear sparingly in calls to action, small rules or background fields. Do not use green as a large surface colour.

- [ ] **Step 2: Rebalance the hydrological background**

Replace forest-green fields with low-opacity river blue, mineral blue and occasional warm silt/coral diffusion. Keep all background layers below content, pointer-safe and static under reduced motion.

- [ ] **Step 3: Audit every public page for colour rhythm**

Use at most one supporting accent per section. Ensure calls to action remain consistent, project photography stays unfiltered and page-to-page colour rhythm varies without becoming decorative clutter.

- [ ] **Step 4: Run automated verification**

Run: `npm test && npm run check && npm run build`

Expected: all commands exit successfully with no test, type, lint, formatting or build errors.

- [ ] **Step 5: Inspect desktop and mobile output**

Inspect `/`, `/vision`, `/expertise`, `/projects`, `/team`, `/contact` and one project route at desktop and mobile widths. Confirm the hero slider controls and pause state work; large images remain unoverlaid; background effects stay behind content; dark mode remains readable; mobile navigation works; focus states are visible; and reduced-motion mode is calm.

- [ ] **Step 6: Commit the final visual polish**

```bash
git add src
git commit -m "feat: refine Fluvio visual palette"
```
